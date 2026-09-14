import assert from "node:assert/strict";
import test from "node:test";

import { renderTaskDefinition } from "./render-task-definition.mjs";

const executionRoleArn = "arn:aws:iam::735395976490:role/fanith-website-dev-ssr-execution-role";
const image = "735395976490.dkr.ecr.ap-south-1.amazonaws.com/fanith-website-dev@sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

function fixture() {
  return {
    family: "fanith-website-dev-ssr",
    revision: 5,
    taskDefinitionArn: "arn:aws:ecs:ap-south-1:735395976490:task-definition/fanith-website-dev-ssr:5",
    status: "ACTIVE",
    executionRoleArn,
    networkMode: "awsvpc",
    requiresCompatibilities: ["FARGATE"],
    cpu: "512",
    memory: "1024",
    runtimePlatform: { cpuArchitecture: "X86_64", operatingSystemFamily: "LINUX" },
    environment: [{ name: "SHOULD_NOT_BE_REGISTERED", value: "read-only fixture" }],
    containerDefinitions: [
      {
        name: "fanith-website-dev-ssr",
        image: "735395976490.dkr.ecr.ap-south-1.amazonaws.com/fanith-website-dev@sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        essential: true,
        portMappings: [{ containerPort: 3001, hostPort: 3001, protocol: "tcp" }],
        environment: [{ name: "NEXT_PUBLIC_DEPLOY_ENV", value: "dev" }],
        secrets: [{ name: "RUNTIME_TOKEN", valueFrom: "test-managed-secret-reference" }],
        healthCheck: {
          command: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3001/api/health')"],
          interval: 30,
          timeout: 5,
          retries: 3,
          startPeriod: 180,
        },
      },
    ],
  };
}

test("replaces only the selected image and strips ECS read-only fields", () => {
  const original = fixture();
  const originalContainer = structuredClone(original.containerDefinitions[0]);
  const rendered = renderTaskDefinition(original, {
    containerName: "fanith-website-dev-ssr",
    image,
    expectedFamily: "fanith-website-dev-ssr",
    expectedExecutionRoleArn: executionRoleArn,
  });

  assert.equal(rendered.family, original.family);
  assert.equal(rendered.executionRoleArn, executionRoleArn);
  assert.equal(rendered.containerDefinitions[0].image, image);
  assert.deepEqual(
    { ...rendered.containerDefinitions[0], image: originalContainer.image },
    originalContainer,
  );
  assert.equal(rendered.taskDefinitionArn, undefined);
  assert.equal(rendered.revision, undefined);
  assert.equal(rendered.status, undefined);
  assert.equal(rendered.environment, undefined);
});

test("fails closed on family, capacity, port, health or task-role drift", () => {
  const cases = [
    ["family", (task) => { task.family = "other-family"; }],
    ["capacity", (task) => { task.memory = "2048"; }],
    ["port", (task) => { task.containerDefinitions[0].portMappings[0].containerPort = 8080; }],
    ["health", (task) => { task.containerDefinitions[0].healthCheck.command = ["CMD", "true"]; }],
    ["task role", (task) => { task.taskRoleArn = "arn:aws:iam::735395976490:role/unapproved"; }],
  ];

  for (const [label, mutate] of cases) {
    const task = fixture();
    mutate(task);
    assert.throws(
      () => renderTaskDefinition(task, {
        containerName: "fanith-website-dev-ssr",
        image,
        expectedFamily: "fanith-website-dev-ssr",
        expectedExecutionRoleArn: executionRoleArn,
      }),
      undefined,
      label,
    );
  }
});

test("rejects mutable image references", () => {
  assert.throws(() => renderTaskDefinition(fixture(), {
    containerName: "fanith-website-dev-ssr",
    image: "735395976490.dkr.ecr.ap-south-1.amazonaws.com/fanith-website-dev:latest",
    expectedFamily: "fanith-website-dev-ssr",
    expectedExecutionRoleArn: executionRoleArn,
  }));
});

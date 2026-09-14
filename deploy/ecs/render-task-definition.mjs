import { readFile, writeFile } from "node:fs/promises";

const REGISTERABLE_FIELDS = [
  "family",
  "taskRoleArn",
  "executionRoleArn",
  "networkMode",
  "containerDefinitions",
  "volumes",
  "placementConstraints",
  "requiresCompatibilities",
  "cpu",
  "memory",
  "pidMode",
  "ipcMode",
  "proxyConfiguration",
  "inferenceAccelerators",
  "ephemeralStorage",
  "runtimePlatform",
  "enableFaultInjection",
];

const IMAGE_WITH_DIGEST = /^(?:[^\s@]+)@sha256:[0-9a-f]{64}$/;

export function renderTaskDefinition(
  taskDefinition,
  {
    containerName,
    image,
    expectedFamily,
    expectedExecutionRoleArn = "",
    expectedTaskRoleArn = "",
  },
) {
  if (!taskDefinition || typeof taskDefinition !== "object") {
    throw new Error("Task definition must be an object");
  }
  if (!containerName || !expectedFamily) {
    throw new Error("Container name and expected family are required");
  }
  if (!IMAGE_WITH_DIGEST.test(image || "")) {
    throw new Error("Image must be an immutable repository@sha256 digest");
  }
  if (taskDefinition.family !== expectedFamily) {
    throw new Error(
      `Task family drift: expected ${expectedFamily}, got ${taskDefinition.family ?? "missing"}`,
    );
  }
  if (taskDefinition.networkMode !== "awsvpc") {
    throw new Error("Task network mode drift: expected awsvpc");
  }
  if (!Array.isArray(taskDefinition.requiresCompatibilities) || !taskDefinition.requiresCompatibilities.includes("FARGATE")) {
    throw new Error("Task compatibility drift: FARGATE is required");
  }
  if (String(taskDefinition.cpu) !== "512" || String(taskDefinition.memory) !== "1024") {
    throw new Error("Task capacity drift: expected 512 CPU and 1024 MiB");
  }
  if (taskDefinition.runtimePlatform?.cpuArchitecture !== "X86_64" || taskDefinition.runtimePlatform?.operatingSystemFamily !== "LINUX") {
    throw new Error("Task runtime platform drift: expected Linux X86_64");
  }
  if (expectedExecutionRoleArn && taskDefinition.executionRoleArn !== expectedExecutionRoleArn) {
    throw new Error("Task execution role drift");
  }
  if (taskDefinition.taskRoleArn) {
    if (!expectedTaskRoleArn || taskDefinition.taskRoleArn !== expectedTaskRoleArn) {
      throw new Error("Task role drift; explicit PassRole approval is required");
    }
  } else if (expectedTaskRoleArn) {
    throw new Error("Approved task role is missing from the current task definition");
  }

  const containers = taskDefinition.containerDefinitions;
  if (!Array.isArray(containers) || containers.length !== 1) {
    throw new Error("Container definition drift: exactly one container is required");
  }

  const matchingContainers = containers.filter((container) => container?.name === containerName);
  if (matchingContainers.length !== 1) {
    throw new Error(`Expected exactly one container named ${containerName}`);
  }

  const container = matchingContainers[0];
  const hasPort = Array.isArray(container.portMappings)
    && container.portMappings.some((mapping) => mapping?.containerPort === 3001);
  if (!hasPort) {
    throw new Error("Container port drift: expected port 3001");
  }
  const healthCommand = container.healthCheck?.command;
  if (!Array.isArray(healthCommand) || !healthCommand.join(" ").includes("127.0.0.1:3001/api/health")) {
    throw new Error("Container health-check drift");
  }

  const rendered = {};
  for (const field of REGISTERABLE_FIELDS) {
    if (
      taskDefinition[field] !== undefined
      && taskDefinition[field] !== null
      && !(field === "taskRoleArn" && taskDefinition[field] === "")
    ) {
      rendered[field] = taskDefinition[field];
    }
  }
  rendered.containerDefinitions = containers.map((candidate) => (
    candidate.name === containerName
      ? { ...candidate, image }
      : candidate
  ));

  return rendered;
}

function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith("--")) throw new Error(`Unexpected argument: ${argument}`);
    const key = argument.slice(2);
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    values[key] = value;
    index += 1;
  }
  for (const key of ["input", "output", "image", "container", "expected-family"]) {
    if (!values[key]) throw new Error(`Missing required option --${key}`);
  }
  return values;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const taskDefinition = JSON.parse(await readFile(options.input, "utf8"));
    const rendered = renderTaskDefinition(taskDefinition, {
      containerName: options.container,
      image: options.image,
      expectedFamily: options["expected-family"],
      expectedExecutionRoleArn: options["expected-execution-role-arn"] || "",
      expectedTaskRoleArn: options["expected-task-role-arn"] || "",
    });
    await writeFile(options.output, `${JSON.stringify(rendered, null, 2)}\n`, { mode: 0o600 });
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

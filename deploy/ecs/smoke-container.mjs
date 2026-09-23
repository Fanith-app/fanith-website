const DEFAULT_TIMEOUT_MS = 15_000;
const READY_TIMEOUT_MS = 60_000;
const READY_POLL_MS = 1_000;

function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith("--")) throw new Error(`Unexpected argument: ${argument}`);
    const key = argument.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    values[key] = value;
    index += 1;
  }
  if (!values["base-url"] || !values.environment) {
    throw new Error("Usage: smoke-container.mjs --base-url URL --environment dev|prod");
  }
  const protocol = new URL(values["base-url"]).protocol;
  if (protocol !== "http:" && protocol !== "https:") {
    throw new Error("Base URL must use HTTP or HTTPS");
  }
  if (!new Set(["dev", "prod"]).has(values.environment)) {
    throw new Error("Environment must be dev or prod");
  }
  if (values.environment === "dev" && !values["player-path"]) {
    values["player-path"] = "/fanpedia/football/player/daisuke-yokota";
  }
  if (values.environment === "prod" && !values["player-path"]) {
    values["player-path"] = "/fanpedia/cricket/player/ajeet-verma";
  }
  return values;
}

async function request(baseUrl, path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetch(new URL(path, baseUrl), {
      signal: controller.signal,
      redirect: "manual",
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function expectStatus(baseUrl, path, expectedStatus) {
  const response = await request(baseUrl, path);
  if (response.status !== expectedStatus) {
    throw new Error(`${path}: expected ${expectedStatus}, got ${response.status}`);
  }
  return response;
}

// The container is started detached right before this script runs, so the
// server may not be listening yet. Retry connection errors until it answers.
async function waitForServer(baseUrl) {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  for (;;) {
    try {
      await request(baseUrl, "/api/health");
      return;
    } catch (error) {
      if (Date.now() >= deadline) {
        throw new Error(`Server not reachable after ${READY_TIMEOUT_MS / 1000}s: ${error.message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, READY_POLL_MS));
    }
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const baseUrl = new URL(options["base-url"]);
  baseUrl.pathname = baseUrl.pathname.endsWith("/") ? baseUrl.pathname : `${baseUrl.pathname}/`;

  await waitForServer(baseUrl);

  const health = await expectStatus(baseUrl, "/api/health", 200);
  if ((await health.text()).trim() !== "ok") throw new Error("/api/health: unexpected body");

  const home = await expectStatus(baseUrl, "/", 200);
  const robotsHeader = home.headers.get("x-robots-tag");
  if (options.environment === "dev") {
    if (robotsHeader !== "noindex, nofollow, noarchive") {
      throw new Error("dev home: missing exact noindex response header");
    }
  } else if (robotsHeader !== null) {
    throw new Error("prod home: X-Robots-Tag must be absent");
  }

  const robots = await expectStatus(baseUrl, "/robots.txt", 200);
  const robotsBody = await robots.text();
  if (options.environment === "dev") {
    if (!robotsBody.includes("Disallow: /")) throw new Error("dev robots: crawl disallow is missing");
  } else {
    if (!robotsBody.includes("Allow: /") || robotsBody.includes("Disallow: /")) {
      throw new Error("prod robots: crawl allow policy is incorrect");
    }
  }

  await expectStatus(baseUrl, options["player-path"], 200);
  await expectStatus(baseUrl, "/blog/development", 200);
  await expectStatus(baseUrl, "/sitemap.xml", 200);
  await expectStatus(baseUrl, "/sitemap-players.xml", 200);
  await expectStatus(baseUrl, "/definitely-not-a-real-route", 404);

  console.log(`Smoke checks passed: ${options.environment} health/SEO/routes/sitemaps`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

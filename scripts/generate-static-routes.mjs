import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const DIST_DIR = path.resolve('dist');
const SERVER_ENTRY_PATH = path.join(DIST_DIR, 'server', 'server.js');
const DATOCMS_API_URL = 'https://graphql.datocms.com/';
const DATOCMS_API_TOKEN =
  process.env.DATOCMS_API_TOKEN || 'df33316b1e272f5a8a25cab6746eec';
const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = Number(process.env.STATIC_ROUTES_PORT || '4310');
const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
const SERVER_BOOT_TIMEOUT_MS = 30_000;

const ROUTES_QUERY = `
  query StaticRoutes {
    allCoaches(first: 100, orderBy: name_ASC) {
      slug
    }
    allFilials(
      first: 100
      orderBy: sortOrder_ASC
      filter: { isactive: { eq: true } }
    ) {
      slug
    }
  }
`;

const SNAPSHOT_PATH = path.resolve('src/shared/generated/cms-fallback.json');

const normalizeCoachSlug = (value) => value.replace(/\./g, '_');

const slugifyFilialValue = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/["']/g, '')
    .replace(/[^a-zа-я0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '');

const getFallbackFilialSlug = ({ title, city, metro, street }) =>
  slugifyFilialValue(`${title || metro || city} ${street} ${city}`);

const readSnapshot = () => {
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
};

const readFallbackCoachSlugs = () => {
  const snapshot = readSnapshot();

  if (!Array.isArray(snapshot?.coaches)) {
    return [];
  }

  return Array.from(
    new Set(
      snapshot.coaches
        .map((coach) => coach?.slug)
        .filter(Boolean)
        .map(normalizeCoachSlug)
    )
  );
};

const readFallbackFilialSlugs = () => {
  const snapshot = readSnapshot();

  if (!Array.isArray(snapshot?.filials)) {
    return [];
  }

  const slugs = snapshot.filials.map((filial) => filial?.slug).filter(Boolean);

  if (slugs.length) {
    return Array.from(new Set(slugs));
  }

  return snapshot.filials
    .map((filial) =>
      getFallbackFilialSlug({
        title: filial?.title || '',
        city: filial?.cityObject?.cityName || '',
        metro: filial?.metroName || '',
        street: filial?.street || '',
      })
    )
    .filter(Boolean);
};

const fetchStaticRoutes = async () => {
  const response = await fetch(DATOCMS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: ROUTES_QUERY,
    }),
  });

  if (!response.ok) {
    throw new Error(`DatoCMS request failed: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`DatoCMS GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
};

const getStaticRoutes = async () => {
  try {
    const data = await fetchStaticRoutes();
    const coaches = Array.isArray(data.allCoaches)
      ? data.allCoaches
          .map((coach) => coach?.slug)
          .filter(Boolean)
          .map(normalizeCoachSlug)
      : [];
    const filials = Array.isArray(data.allFilials)
      ? data.allFilials.map((filial) => filial?.slug).filter(Boolean)
      : [];

    if (coaches.length || filials.length) {
      return {
        coaches: Array.from(new Set(coaches)),
        filials: Array.from(new Set(filials)),
      };
    }
  } catch (error) {
    console.warn(
      '[generate-static-routes] Falling back to generated snapshot:',
      error instanceof Error ? error.message : error
    );
  }

  return {
    coaches: readFallbackCoachSlugs(),
    filials: readFallbackFilialSlugs(),
  };
};

const ensureRouteFile = (baseDir, routePath, html) => {
  const routeDir = path.join(baseDir, routePath);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
};

const resetRouteRoot = (routeRoot) => {
  const routeRootPath = path.join(DIST_DIR, routeRoot);

  fs.rmSync(routeRootPath, {
    force: true,
    recursive: true,
  });
  fs.mkdirSync(routeRootPath, { recursive: true });
};

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const waitForServer = async (serverProcess) => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < SERVER_BOOT_TIMEOUT_MS) {
    if (serverProcess.exitCode !== null) {
      throw new Error(
        `[generate-static-routes] SSR server exited with code ${serverProcess.exitCode}`
      );
    }

    try {
      // Polling the server boot state requires sequential requests.
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(`${SERVER_URL}/`, {
        headers: {
          Accept: 'text/html',
        },
      });

      if (response.ok) {
        return;
      }
    } catch (error) {
      // Keep polling until the server starts accepting connections.
    }

    // Polling the server boot state requires sequential backoff.
    // eslint-disable-next-line no-await-in-loop
    await delay(300);
  }

  throw new Error('[generate-static-routes] Timed out waiting for SSR server');
};

const renderRouteHtml = async (routePath) => {
  const response = await fetch(`${SERVER_URL}/${routePath}/`, {
    headers: {
      Accept: 'text/html',
    },
  });

  if (!response.ok) {
    throw new Error(
      `[generate-static-routes] Failed to render ${routePath}: ${response.status}`
    );
  }

  return response.text();
};

const startSsrServer = async () => {
  if (!fs.existsSync(SERVER_ENTRY_PATH)) {
    throw new Error(
      `[generate-static-routes] Missing SSR entry: ${SERVER_ENTRY_PATH}`
    );
  }

  const serverLogs = [];
  const serverProcess = spawn(process.execPath, [SERVER_ENTRY_PATH], {
    cwd: DIST_DIR,
    env: {
      ...process.env,
      ASSETS_PREFIX: '/client/',
      PORT: String(SERVER_PORT),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const pushLogs = (chunk) => {
    const output = chunk.toString().trim();

    if (output) {
      serverLogs.push(output);
    }
  };

  serverProcess.stdout?.on('data', pushLogs);
  serverProcess.stderr?.on('data', pushLogs);

  try {
    await waitForServer(serverProcess);

    return {
      serverLogs,
      serverProcess,
    };
  } catch (error) {
    serverProcess.kill('SIGTERM');
    throw new Error(
      `${error instanceof Error ? error.message : error}\n${serverLogs.join('\n')}`
    );
  }
};

const stopSsrServer = async (serverProcess) =>
  new Promise((resolve) => {
    if (serverProcess.exitCode !== null) {
      resolve();
      return;
    }

    serverProcess.once('close', () => resolve());
    serverProcess.kill('SIGTERM');

    setTimeout(() => {
      if (serverProcess.exitCode === null) {
        serverProcess.kill('SIGKILL');
      }
    }, 5_000);
  });

const writeStaticRoutes = async ({ coaches, filials }) => {
  resetRouteRoot('coaches');
  resetRouteRoot('filials');

  await Promise.all(
    coaches.map(async (slug) => {
      const routePath = `coaches/${slug}`;
      const html = await renderRouteHtml(routePath);
      ensureRouteFile(DIST_DIR, routePath, html);
    })
  );

  await Promise.all(
    filials.map(async (slug) => {
      const routePath = `filials/${slug}`;
      const html = await renderRouteHtml(routePath);
      ensureRouteFile(DIST_DIR, routePath, html);
    })
  );
};

const main = async () => {
  const { coaches, filials } = await getStaticRoutes();
  const { serverProcess } = await startSsrServer();

  try {
    await writeStaticRoutes({ coaches, filials });
  } finally {
    // Server shutdown must complete before the script exits.
    // eslint-disable-next-line no-await-in-loop
    await stopSsrServer(serverProcess);
  }

  const allRoutesCount = coaches.length + filials.length;
  console.log(
    `[generate-static-routes] Rendered ${allRoutesCount} dynamic static routes`
  );
};

main().catch((error) => {
  console.error('[generate-static-routes] Failed:', error);
  process.exitCode = 1;
});

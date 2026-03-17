import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const DATOCMS_API_URL = 'https://graphql.datocms.com/';
const DATOCMS_API_TOKEN =
  process.env.DATOCMS_API_TOKEN || 'df33316b1e272f5a8a25cab6746eec';

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

  const slugs = snapshot.filials
    .map((filial) => filial?.slug)
    .filter(Boolean);

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
      ? data.allFilials
          .map((filial) => filial?.slug)
          .filter(Boolean)
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

const main = async () => {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    throw new Error(`Missing shell HTML: ${INDEX_HTML_PATH}`);
  }

  const html = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  const { coaches, filials } = await getStaticRoutes();

  coaches.forEach((slug) => {
    ensureRouteFile(DIST_DIR, path.join('coaches', slug), html);
  });

  filials.forEach((slug) => {
    ensureRouteFile(DIST_DIR, path.join('filials', slug), html);
  });

  const allRoutesCount = coaches.length + filials.length;
  console.log(
    `[generate-static-routes] Generated ${allRoutesCount} static route shells`
  );
};

main().catch((error) => {
  console.error('[generate-static-routes] Failed:', error);
  process.exitCode = 1;
});

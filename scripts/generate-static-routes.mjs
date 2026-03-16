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
    allFilials(orderBy: sortOrder_ASC, filter: { isactive: { eq: true } }) {
      slug
      title
      cityName
      metroName
      street: address
    }
  }
`;

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

const readFallbackCoachSlugs = () => {
  const coachesPath = path.resolve('src/shared/mocks/coaches.ts');
  const source = fs.readFileSync(coachesPath, 'utf8');
  const matches = source.matchAll(/id:\s*'([^']+)'/g);

  return Array.from(
    new Set(Array.from(matches, ([, slug]) => normalizeCoachSlug(slug)))
  );
};

const readFallbackFilialSlugs = () => {
  const citiesDir = path.resolve('src/shared/mocks/cities');
  const files = fs.readdirSync(citiesDir).filter((file) => file.endsWith('.ts'));
  const slugs = new Set();

  files.forEach((fileName) => {
    const source = fs.readFileSync(path.join(citiesDir, fileName), 'utf8');
    const addressBlocks = source.matchAll(
      /address:\s*{([\s\S]*?)}\s*,\s*coaches:/g
    );

    Array.from(addressBlocks).forEach(([, block]) => {
      const cityMatch = block.match(/city:\s*'([^']+)'/);
      const streetMatch = block.match(/street:\s*'([^']+)'/);
      const metroMatch = block.match(/metro:\s*{[\s\S]*?name:\s*'([^']+)'/);

      if (!cityMatch || !streetMatch) {
        return;
      }

      slugs.add(
        getFallbackFilialSlug({
          city: cityMatch[1],
          metro: metroMatch?.[1] || '',
          street: streetMatch[1],
          title: '',
        })
      );
    });
  });

  return Array.from(slugs);
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
      '[generate-static-routes] Falling back to local mocks:',
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

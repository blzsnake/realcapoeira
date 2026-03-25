import fs from 'node:fs';
import path from 'node:path';

const DATOCMS_API_URL = 'https://graphql.datocms.com/';
const DATOCMS_API_TOKEN =
  process.env.DATOCMS_API_TOKEN || 'df33316b1e272f5a8a25cab6746eec';

const OUTPUT_PATH = path.resolve('src/shared/generated/cms-fallback.json');
const SCHEMA_VERSION = 2;

const HOME_QUERY = `
  query HomeCmsFallback {
    allNews(first: 20, orderBy: position_ASC) {
      id
      title
      shortTitle
      shortDescription
      descriptionUp
      publishedAt: _publishedAt
    }
    dataCommon {
      trainingYears
      quantityFilials
      quantityTraineers
    }
    allCitiesLists(orderBy: position_ASC, filter: { showOnMain: { eq: true } }) {
      id
      cityId
      cityName
      country
      cityFriend
      showOnMain
      cityImage {
        url
        alt
      }
    }
  }
`;

const COACHES_QUERY = `
  query CoachesFallback {
    allCoaches(first: 100, orderBy: name_ASC) {
      slug
      name
      nick
      level
      phone
      quote
      city {
        cityName
      }
      since
      incapoeira
      groups
      selfDescription {
        value
      }
      trainDescription {
        value
      }
      photo {
        url
        alt
      }
      linkTg
      linkInst
      linkVk
      linkWa
      linkYoutube
    }
  }
`;

const FILIALS_QUERY = `
  query FilialsFallback {
    allFilials(
      first: 100
      orderBy: sortOrder_ASC
      filter: { isactive: { eq: true } }
    ) {
      id
      title
      slug
      isActive: isactive
      sortOrder
      cityObject {
        cityKey: cityId
        cityName
      }
      metroName
      metroColor {
        hex
      }
      street: address
      location: coordinates {
        latitude
        longitude
      }
      heroImage {
        url
        alt
      }
      hallDescription {
        value
      }
      trialLessonPrice: firstLesson
      singleLessonPrice: singleLesson
      monthlyPrice
      coaches: coachesList {
        id
        slug
        name
        phone
        level
        nick
        photo {
          url
          alt
        }
      }
      scheduleItems {
        ... on FilialScheduleItemRecord {
          id
          weekday
          groupKey
          groupLabel
          timeFrom
          timeTo
        }
      }
      createdAt: _createdAt
      updatedAt: _updatedAt
    }
  }
`;

const normalizeText = (value) => value?.trim() || '';
const normalizeCoachSlug = (value) => value.replace(/\./g, '_');

const requestDatoCms = async (query) => {
  const response = await fetch(DATOCMS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
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

const normalizeNewsSection = (allNews) => ({
  title: 'События',
  description: '',
  items: (Array.isArray(allNews) ? allNews : [])
    .map((news) => {
      const title = normalizeText(news?.title);
      const shortTitle = normalizeText(news?.shortTitle) || title;
      const shortDescription =
        normalizeText(news?.shortDescription) ||
        normalizeText(news?.descriptionUp);
      const description =
        normalizeText(news?.descriptionUp) || shortDescription || title;

      if (!title || !shortTitle || !shortDescription) {
        return null;
      }

      return {
        id: news.id,
        shortTitle,
        title,
        shortDescription,
        description,
        publishedAt: news.publishedAt || undefined,
      };
    })
    .filter(Boolean),
});

const normalizeStats = (dataCommon) => ({
  trainingYears:
    typeof dataCommon?.trainingYears === 'number'
      ? dataCommon.trainingYears
      : 18,
  quantityFilials:
    typeof dataCommon?.quantityFilials === 'number'
      ? dataCommon.quantityFilials
      : 45,
  quantityTraineers:
    typeof dataCommon?.quantityTraineers === 'number'
      ? dataCommon.quantityTraineers
      : 1300,
});

const normalizeWorldwideCities = (allCitiesLists) =>
  (Array.isArray(allCitiesLists) ? allCitiesLists : [])
    .map((city) => {
      const cityId = normalizeText(city?.cityId);
      const cityName = normalizeText(city?.cityName);
      const country = normalizeText(city?.country);
      const imageUrl = normalizeText(city?.cityImage?.url);
      const cityFriend = Boolean(city?.cityFriend);

      if (!country || !imageUrl || (!cityFriend && !cityName)) {
        return null;
      }

      return {
        id: city.id,
        cityId,
        cityName,
        country,
        cityFriend,
        imageUrl,
        imageAlt: normalizeText(city?.cityImage?.alt) || cityName || country,
      };
    })
    .filter(Boolean);

const normalizeCoach = (coach) => ({
  slug: normalizeCoachSlug(coach.slug),
  name: coach.name || '',
  nick: coach.nick || '',
  level: coach.level || '',
  phone: coach.phone || '',
  quote: coach.quote || '',
  city: normalizeText(coach.city?.cityName),
  since: coach.since || '',
  incapoeira: coach.incapoeira || '',
  groups: Array.isArray(coach.groups) ? coach.groups : [],
  selfDescription: coach.selfDescription || null,
  trainDescription: coach.trainDescription || null,
  photo: coach.photo
    ? {
        url: coach.photo.url,
        alt: coach.photo.alt || coach.name || '',
      }
    : null,
  linkTg: coach.linkTg || null,
  linkInst: coach.linkInst || null,
  linkVk: coach.linkVk || null,
  linkWa: coach.linkWa || null,
  linkYoutube: coach.linkYoutube || null,
});

const normalizeFilialCoach = (coach) => ({
  id: coach.id,
  slug: normalizeCoachSlug(coach.slug || coach.id),
  name: coach.name || '',
  phone: coach.phone || '',
  level: coach.level || '',
  nick: coach.nick || '',
  photo: coach.photo
    ? {
        url: coach.photo.url,
        alt: coach.photo.alt || coach.name || '',
      }
    : null,
});

const normalizeFilial = (filial) => ({
  id: filial.id,
  title: filial.title || '',
  slug: filial.slug || '',
  isActive: Boolean(filial.isActive),
  sortOrder: filial.sortOrder ?? null,
  cityObject: filial.cityObject
    ? {
        cityKey: filial.cityObject.cityKey || null,
        cityName: filial.cityObject.cityName || null,
      }
    : null,
  metroName: filial.metroName || null,
  metroColor: filial.metroColor ? { hex: filial.metroColor.hex } : null,
  street: filial.street || '',
  location: filial.location
    ? {
        latitude: filial.location.latitude,
        longitude: filial.location.longitude,
      }
    : null,
  heroImage: filial.heroImage
    ? {
        url: filial.heroImage.url,
        alt: filial.heroImage.alt || filial.title || '',
      }
    : null,
  hallDescription: filial.hallDescription || null,
  trialLessonPrice: filial.trialLessonPrice ?? null,
  singleLessonPrice: filial.singleLessonPrice ?? null,
  monthlyPrice: filial.monthlyPrice ?? null,
  coaches: (Array.isArray(filial.coaches) ? filial.coaches : []).map(
    normalizeFilialCoach
  ),
  scheduleItems: Array.isArray(filial.scheduleItems)
    ? filial.scheduleItems
    : [],
  createdAt: filial.createdAt || '',
  updatedAt: filial.updatedAt || '',
});

const main = async () => {
  try {
    const [homeData, coachesData, filialsData] = await Promise.all([
      requestDatoCms(HOME_QUERY),
      requestDatoCms(COACHES_QUERY),
      requestDatoCms(FILIALS_QUERY),
    ]);

    const snapshot = {
      generatedAt: new Date().toISOString(),
      schemaVersion: SCHEMA_VERSION,
      home: {
        newsSection: normalizeNewsSection(homeData.allNews),
        stats: normalizeStats(homeData.dataCommon),
        worldwideCities: normalizeWorldwideCities(homeData.allCitiesLists),
      },
      coaches: (Array.isArray(coachesData.allCoaches)
        ? coachesData.allCoaches
        : []
      )
        .map(normalizeCoach)
        .filter((coach) => coach.slug && coach.name),
      filials: (Array.isArray(filialsData.allFilials)
        ? filialsData.allFilials
        : []
      )
        .map(normalizeFilial)
        .filter(
          (filial) =>
            filial.slug &&
            filial.title &&
            filial.street &&
            filial.location?.latitude !== undefined &&
            filial.location?.longitude !== undefined
        ),
    };

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
    // eslint-disable-next-line no-console
    console.log(
      `[refresh-cms-fallback] Updated snapshot: ${snapshot.coaches.length} coaches, ${snapshot.filials.length} filials, ${snapshot.home.newsSection.items.length} news`
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (fs.existsSync(OUTPUT_PATH)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[refresh-cms-fallback] Failed to refresh, keeping existing snapshot: ${message}`
      );

      return;
    }

    throw error;
  }
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(
    '[refresh-cms-fallback] Failed:',
    error instanceof Error ? error.message : error
  );
  process.exitCode = 1;
});

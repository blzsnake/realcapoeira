import { datocmsRequest } from '~shared/api/datocms';
import { HOME_CMS_QUERY } from '~shared/api/queries/home';
import type { HomeCmsResponse } from '~shared/api/types/home';
import { CMS_FALLBACK } from '~shared/generated/snapshot';

export type HomeNewsItem = {
  id: string;
  shortTitle: string;
  title: string;
  shortDescription: string;
  description: string;
  publishedAt?: string;
};

export type HomeNewsSection = {
  source: 'cms' | 'fallback';
  title: string;
  description: string;
  items: HomeNewsItem[];
};

export type HomeStats = {
  trainingYears: number;
  quantityFilials: number;
  quantityTraineers: number;
};

export type HomeCmsData = {
  newsSection: HomeNewsSection;
  stats: HomeStats;
};

type CachedHomeCmsPayload = {
  timestamp: number;
  value: HomeCmsData;
};

type LoadHomeCmsOptions = {
  forceFresh?: boolean;
};

const EMERGENCY_HOME_NEWS_SECTION: HomeNewsSection = {
  source: 'fallback',
  title: 'События',
  description: '',
  items: [
    {
      id: 'groups',
      shortTitle: 'Идет набор в группы',
      title: 'Идет набор в группы по капоэйре',
      shortDescription:
        'Попробуйте капоэйру — поможем стать сильнее, гибче и выносливее. Будем рады и детям, и взрослым',
      description:
        'Попробуйте капоэйру — поможем стать сильнее, гибче и выносливее. Будем рады и детям, и взрослым',
    },
    {
      id: 'kids-camp',
      shortTitle: 'Спортивные сборы 7+',
      title: 'Спортивные сборы для школьников',
      shortDescription:
        'Ежедневные тренировки и игры на свежем воздухе для школьников',
      description:
        'Ежедневные тренировки и игры на свежем воздухе для школьников',
    },
    {
      id: 'adult-camp',
      shortTitle: 'Спортивные сборы 16+',
      title: 'Спортивные сборы для взрослых',
      shortDescription:
        'Приглашаем в лагерь для взрослых — с мастер-классами от бразильских мастеров и танцами',
      description:
        'Приглашаем в лагерь для взрослых — с мастер-классами от бразильских мастеров и танцами',
    },
    {
      id: 'ecosystem',
      shortTitle: 'Экосистема Real Capoeira',
      title: 'Станьте частью сообщества',
      shortDescription:
        'Следите за нами в удобной соцсети. Чтобы не пропустить новости школы, подпишитесь на чат-бот в Telegram',
      description:
        'Следите за нами в удобной соцсети. Чтобы не пропустить новости школы, подпишитесь на чат-бот в Telegram',
    },
  ],
};

const EMERGENCY_HOME_STATS: HomeStats = {
  trainingYears: 18,
  quantityFilials: 45,
  quantityTraineers: 1300,
};

const HOME_CMS_CACHE_KEY = 'realcapoeira-home-cms-v1';
const HOME_CMS_CACHE_TTL =
  process.env.NODE_ENV === 'development' ? 1000 * 60 * 3 : 1000 * 60 * 15;
const HOME_CMS_DEBUG_KEY = 'realcapoeira-debug-home-cms';

let cachedHomeCmsData: HomeCmsData | null = null;
let homeCmsPromise: Promise<HomeCmsData> | null = null;

const normalizeText = (value: string | null | undefined) => value?.trim() || '';

const isBrowser = () => typeof window !== 'undefined';

const isHomeCmsDebugEnabled = () => {
  if (!isBrowser()) {
    return false;
  }

  try {
    const flag = window.localStorage.getItem(HOME_CMS_DEBUG_KEY);

    return flag === '1' || flag === 'true';
  } catch {
    return false;
  }
};

const debugHomeCms = (
  event: string,
  details?: Record<string, number | string | boolean | null>
) => {
  if (!isHomeCmsDebugEnabled()) {
    return;
  }

  if (details) {
    // eslint-disable-next-line no-console
    console.info('[homeCms]', event, details);

    return;
  }

  // eslint-disable-next-line no-console
  console.info('[homeCms]', event);
};

const isValidStat = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

const mapNewsRecord = (
  news: HomeCmsResponse['allNews'][number]
): HomeNewsItem | null => {
  const title = normalizeText(news.title);
  const shortTitle = normalizeText(news.shortTitle) || title;
  const shortDescription =
    normalizeText(news.shortDescription) || normalizeText(news.descriptionUp);
  const description =
    normalizeText(news.descriptionUp) || shortDescription || title;

  if (!title || !shortTitle || !shortDescription) {
    return null;
  }

  return {
    id: news.id,
    shortTitle,
    title,
    shortDescription,
    description,
    publishedAt: news.publishedAt,
  };
};

const normalizeHomeStats = (
  dataCommon: HomeCmsResponse['dataCommon']
): HomeStats | null => {
  if (
    !isValidStat(dataCommon?.trainingYears) ||
    !isValidStat(dataCommon?.quantityFilials) ||
    !isValidStat(dataCommon?.quantityTraineers)
  ) {
    return null;
  }

  return {
    trainingYears: dataCommon.trainingYears,
    quantityFilials: dataCommon.quantityFilials,
    quantityTraineers: dataCommon.quantityTraineers,
  };
};

const readHomeCmsFromStorage = () => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(HOME_CMS_CACHE_KEY);

    if (!rawValue) {
      return null;
    }

    const payload = JSON.parse(rawValue) as CachedHomeCmsPayload;

    if (
      !payload?.timestamp ||
      !payload?.value ||
      Date.now() - payload.timestamp > HOME_CMS_CACHE_TTL
    ) {
      debugHomeCms('storage cache expired');
      window.localStorage.removeItem(HOME_CMS_CACHE_KEY);

      return null;
    }

    debugHomeCms('storage cache hit', {
      ageMs: Date.now() - payload.timestamp,
    });

    return payload.value;
  } catch {
    debugHomeCms('storage cache read failed');

    return null;
  }
};

const writeHomeCmsToStorage = (value: HomeCmsData) => {
  if (!isBrowser()) {
    return;
  }

  try {
    const payload: CachedHomeCmsPayload = {
      timestamp: Date.now(),
      value,
    };

    window.localStorage.setItem(HOME_CMS_CACHE_KEY, JSON.stringify(payload));
    debugHomeCms('storage cache updated', {
      newsItems: value.newsSection.items.length,
    });
  } catch {
    // Ignore storage write errors and keep the in-memory cache only.
    debugHomeCms('storage cache write failed');
  }
};

function getSnapshotHomeNewsSection(): HomeNewsSection {
  const items = Array.isArray(CMS_FALLBACK.home.newsSection.items)
    ? CMS_FALLBACK.home.newsSection.items.filter(
        (item) =>
          item?.id && item?.title && item?.shortTitle && item?.shortDescription
      )
    : [];

  if (!items.length) {
    return EMERGENCY_HOME_NEWS_SECTION;
  }

  return {
    source: 'cms',
    title: CMS_FALLBACK.home.newsSection.title || 'События',
    description: CMS_FALLBACK.home.newsSection.description || '',
    items,
  };
}

function getSnapshotHomeStats(): HomeStats {
  const { stats } = CMS_FALLBACK.home;

  if (
    !isValidStat(stats?.trainingYears) ||
    !isValidStat(stats?.quantityFilials) ||
    !isValidStat(stats?.quantityTraineers)
  ) {
    return EMERGENCY_HOME_STATS;
  }

  return stats;
}

const buildHomeCmsData = (data: HomeCmsResponse): HomeCmsData => {
  const items = (data.allNews || [])
    .map(mapNewsRecord)
    .filter((item): item is HomeNewsItem => Boolean(item));
  const normalizedStats = normalizeHomeStats(data.dataCommon);

  return {
    newsSection: items.length
      ? {
          source: 'cms',
          title: 'События',
          description: '',
          items,
        }
      : getSnapshotHomeNewsSection(),
    stats: normalizedStats || getSnapshotHomeStats(),
  };
};

export const getFallbackHomeNewsSection = () => getSnapshotHomeNewsSection();

export const getFallbackHomeStats = () => getSnapshotHomeStats();

export const getFallbackHomeCmsData = (): HomeCmsData => ({
  newsSection: getFallbackHomeNewsSection(),
  stats: getFallbackHomeStats(),
});

export const getCachedHomeCmsData = () => {
  if (cachedHomeCmsData) {
    debugHomeCms('memory cache hit', {
      newsItems: cachedHomeCmsData.newsSection.items.length,
    });

    return cachedHomeCmsData;
  }

  const cachedStorageValue = readHomeCmsFromStorage();

  if (cachedStorageValue) {
    cachedHomeCmsData = cachedStorageValue;
    debugHomeCms('memory cache hydrated from storage', {
      newsItems: cachedHomeCmsData.newsSection.items.length,
    });

    return cachedHomeCmsData;
  }

  return null;
};

export async function loadHomeCmsDataWithFallback(
  options: LoadHomeCmsOptions = {}
) {
  const cachedValue = getCachedHomeCmsData();

  if (!options.forceFresh && cachedValue) {
    debugHomeCms('return cached value');

    return cachedValue;
  }

  if (homeCmsPromise) {
    debugHomeCms('join in-flight request');

    return homeCmsPromise;
  }

  homeCmsPromise = (async () => {
    try {
      debugHomeCms('request start', {
        forceFresh: Boolean(options.forceFresh),
        hasCachedValue: Boolean(cachedValue),
      });
      const data = await datocmsRequest<HomeCmsResponse>({
        query: HOME_CMS_QUERY,
      });

      cachedHomeCmsData = buildHomeCmsData(data);
      debugHomeCms('request success', {
        newsItems: cachedHomeCmsData.newsSection.items.length,
        usedFallbackNews: cachedHomeCmsData.newsSection.source === 'fallback',
      });
      writeHomeCmsToStorage(cachedHomeCmsData);

      return cachedHomeCmsData;
    } catch {
      cachedHomeCmsData = cachedValue || getFallbackHomeCmsData();
      debugHomeCms('request failed, using fallback', {
        usedCachedValue: Boolean(cachedValue),
      });

      return cachedHomeCmsData;
    } finally {
      homeCmsPromise = null;
    }
  })();

  return homeCmsPromise;
}

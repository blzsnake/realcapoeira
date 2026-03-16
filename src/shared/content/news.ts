import { datocmsRequest } from '~shared/api/datocms';
import { HOME_NEWS_QUERY } from '~shared/api/queries/news';
import type { HomeNewsResponse, NewsRecord } from '~shared/api/types/news';

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

type CachedHomeNewsSectionPayload = {
  timestamp: number;
  value: HomeNewsSection;
};

const FALLBACK_HOME_NEWS_SECTION: HomeNewsSection = {
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

let cachedHomeNewsSection: HomeNewsSection | null = null;
let homeNewsSectionPromise: Promise<HomeNewsSection> | null = null;
const HOME_NEWS_CACHE_KEY = 'realcapoeira-home-news';
const HOME_NEWS_CACHE_TTL = 1000 * 60 * 15;

const normalizeText = (value: string | null | undefined) => value?.trim() || '';

const mapNewsRecord = (news: NewsRecord): HomeNewsItem | null => {
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

export const getFallbackHomeNewsSection = () => FALLBACK_HOME_NEWS_SECTION;

const isBrowser = () => typeof window !== 'undefined';

const readHomeNewsSectionFromStorage = () => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(HOME_NEWS_CACHE_KEY);

    if (!rawValue) {
      return null;
    }

    const payload = JSON.parse(rawValue) as CachedHomeNewsSectionPayload;

    if (
      !payload?.timestamp ||
      !payload?.value ||
      Date.now() - payload.timestamp > HOME_NEWS_CACHE_TTL
    ) {
      window.localStorage.removeItem(HOME_NEWS_CACHE_KEY);

      return null;
    }

    return payload.value;
  } catch {
    return null;
  }
};

const writeHomeNewsSectionToStorage = (value: HomeNewsSection) => {
  if (!isBrowser() || value.source !== 'cms') {
    return;
  }

  try {
    const payload: CachedHomeNewsSectionPayload = {
      timestamp: Date.now(),
      value,
    };

    window.localStorage.setItem(HOME_NEWS_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore localStorage write errors and keep in-memory cache only.
  }
};

export async function loadHomeNewsSectionWithFallback() {
  if (cachedHomeNewsSection) {
    return cachedHomeNewsSection;
  }

  const cachedStorageValue = readHomeNewsSectionFromStorage();

  if (cachedStorageValue) {
    cachedHomeNewsSection = cachedStorageValue;

    return cachedHomeNewsSection;
  }

  if (homeNewsSectionPromise) {
    return homeNewsSectionPromise;
  }

  homeNewsSectionPromise = (async () => {
    try {
      const data = await datocmsRequest<HomeNewsResponse>({
        query: HOME_NEWS_QUERY,
      });
      const items = (data.allNews || [])
        .map(mapNewsRecord)
        .filter((item): item is HomeNewsItem => Boolean(item));

      if (!items.length) {
        cachedHomeNewsSection = getFallbackHomeNewsSection();

        return cachedHomeNewsSection;
      }

      cachedHomeNewsSection = {
        source: 'cms',
        title: 'События',
        description: '',
        items,
      };
      writeHomeNewsSectionToStorage(cachedHomeNewsSection);

      return cachedHomeNewsSection;
    } catch {
      cachedHomeNewsSection = getFallbackHomeNewsSection();

      return cachedHomeNewsSection;
    } finally {
      homeNewsSectionPromise = null;
    }
  })();

  return homeNewsSectionPromise;
}

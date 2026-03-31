import { datocmsRequest } from '~shared/api/datocms';
import { ALL_COACHES_QUERY } from '~shared/api/queries/coaches';
import type {
  AllCoachesResponse,
  CoachApiRecord,
  Coach,
} from '~shared/api/types/coach';
import { CMS_FALLBACK } from '~shared/generated/snapshot';
import { COACH_PHOTOS } from '../../routes/coaches/utils';

const compareByName = new Intl.Collator('ru').compare;
const COACH_LEVEL_ORDER = [
  'contra-mestre',
  'professor',
  'instrutor',
  'monitor',
  'minitor',
] as const;

const COACH_LEVEL_ALIASES: Record<string, (typeof COACH_LEVEL_ORDER)[number]> =
  {
    'contra-mestra': 'contra-mestre',
    professora: 'professor',
    instrutora: 'instrutor',
    monitora: 'monitor',
    minitora: 'minitor',
  };

let cachedCoaches: Coach[] | null = null;
let cachedCoachesFetchedAt: number | null = null;
let pendingCoachesRequest: Promise<Coach[]> | null = null;
const COACHES_CACHE_TTL =
  process.env.NODE_ENV === 'development' ? 1000 * 60 * 3 : 1000 * 60 * 15;

export const normalizeCoachSlug = (value: string) => value.replace(/\./g, '_');

const getFallbackCoachPhoto = (slug: string) => {
  const normalizedSlug = slug.trim();
  const legacySlug = normalizedSlug.replace(/_/g, '.');

  return COACH_PHOTOS[normalizedSlug] || COACH_PHOTOS[legacySlug] || '';
};

const normalizeCoachCity = (city: CoachApiRecord['city']) =>
  city?.cityName?.trim() || '';

export const getCoachLevelRank = (level: string) => {
  const normalizedLevel = level.trim().toLowerCase();
  const baseLevel = COACH_LEVEL_ALIASES[normalizedLevel] || normalizedLevel;
  const rank = COACH_LEVEL_ORDER.indexOf(
    baseLevel as (typeof COACH_LEVEL_ORDER)[number]
  );

  return rank === -1 ? COACH_LEVEL_ORDER.length : rank;
};

export const sortCoachesByName = (coaches: Coach[]) =>
  [...coaches].sort((left, right) => compareByName(left.name, right.name));

export const sortCoachesForList = (coaches: Coach[]) =>
  [...coaches].sort((left, right) => {
    const rankDiff =
      getCoachLevelRank(left.level) - getCoachLevelRank(right.level);

    return rankDiff || compareByName(left.name, right.name);
  });

export const normalizeCoachRecord = (coach: CoachApiRecord): Coach => {
  const normalizedSlug = normalizeCoachSlug(coach.slug);
  const fallbackPhotoUrl = getFallbackCoachPhoto(normalizedSlug);
  const photoUrl = coach.photo?.url || fallbackPhotoUrl;

  return {
    ...coach,
    slug: normalizedSlug,
    city: normalizeCoachCity(coach.city),
    groups: coach.groups || [],
    photo: photoUrl
      ? {
          url: photoUrl,
          alt: coach.photo?.alt || coach.name,
        }
      : null,
  };
};

const isCoachRecordValid = (
  coach: Partial<Coach> | null | undefined
): coach is Coach => Boolean(coach?.slug && coach?.name);

export const normalizeFallbackCoach = (coach: Coach): Coach => {
  const normalizedSlug = normalizeCoachSlug(coach.slug);
  const fallbackPhotoUrl = getFallbackCoachPhoto(normalizedSlug);
  const photoUrl = coach.photo?.url || fallbackPhotoUrl;

  return {
    ...coach,
    slug: normalizedSlug,
    city: coach.city || '',
    groups: coach.groups || [],
    photo: photoUrl
      ? {
          url: photoUrl,
          alt: coach.photo?.alt || coach.name,
        }
      : null,
  };
};

export const buildFallbackCoaches = (coaches: Coach[]) =>
  sortCoachesByName(
    coaches.map(normalizeFallbackCoach).filter(isCoachRecordValid)
  );

const FALLBACK_COACHES = buildFallbackCoaches(CMS_FALLBACK.coaches);

const buildApiCoaches = (coaches: CoachApiRecord[]) =>
  sortCoachesByName(
    coaches.map(normalizeCoachRecord).filter(isCoachRecordValid)
  );

export const getFallbackCoaches = () => FALLBACK_COACHES;

export const getCachedCoaches = () => cachedCoaches;

const setCoachesCache = (coaches: Coach[]) => {
  cachedCoaches = coaches;
  cachedCoachesFetchedAt = Date.now();

  return cachedCoaches;
};

const hasFreshCoachesCache = () =>
  Boolean(
    cachedCoaches &&
      cachedCoachesFetchedAt &&
      Date.now() - cachedCoachesFetchedAt < COACHES_CACHE_TTL
  );

export const setCoachesCacheFromApiRecords = (
  coaches: CoachApiRecord[] | null | undefined
) => {
  if (!Array.isArray(coaches)) {
    return setCoachesCache(getFallbackCoaches());
  }

  return setCoachesCache(buildApiCoaches(coaches));
};

export async function loadCoachesWithFallback({
  forceRefresh = false,
}: {
  forceRefresh?: boolean;
} = {}) {
  if (!forceRefresh && hasFreshCoachesCache()) {
    return cachedCoaches;
  }

  if (pendingCoachesRequest) {
    return pendingCoachesRequest;
  }

  pendingCoachesRequest = (async () => {
    try {
      const data = await datocmsRequest<AllCoachesResponse>({
        query: ALL_COACHES_QUERY,
      });

      if (!Array.isArray(data.allCoaches)) {
        return setCoachesCache(getFallbackCoaches());
      }

      return setCoachesCacheFromApiRecords(data.allCoaches);
    } catch {
      return setCoachesCache(getFallbackCoaches());
    } finally {
      pendingCoachesRequest = null;
    }
  })();

  return pendingCoachesRequest;
}

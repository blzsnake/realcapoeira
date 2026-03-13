import { datocmsRequest } from '~shared/api/datocms';
import { ALL_COACHES_QUERY } from '~shared/api/queries/coaches';
import type {
  AllCoachesResponse,
  Coach,
  DatoCMSStructuredText,
} from '~shared/api/types/coach';
import { COACHES as COACHES_MOCK } from '~shared/mocks/coaches';

type MockCoach = (typeof COACHES_MOCK)[number];

const compareByName = new Intl.Collator('ru').compare;

export const normalizeCoachSlug = (value: string) => value.replace(/\./g, '_');

const plainTextToStructuredText = (
  text: string | undefined
): DatoCMSStructuredText | null => {
  if (!text?.trim()) {
    return null;
  }

  const paragraphs = text
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value: paragraph,
        },
      ],
    }));

  return {
    value: {
      schema: 'dast',
      document: {
        type: 'root',
        children: paragraphs,
      },
    },
  };
};

const mapMockCoachToCoach = (coach: MockCoach): Coach => ({
  slug: normalizeCoachSlug(coach.id),
  name: coach.name,
  nick: coach.nick || '',
  level: coach.level || '',
  phone: coach.phone || '',
  quote: coach.quote || '',
  city: coach.city || '',
  since: coach.since || '',
  incapoeira: coach.incapoeira || '',
  groups: coach.groups || [],
  selfDescription: plainTextToStructuredText(coach.selfDescription),
  trainDescription: plainTextToStructuredText(coach.trainDescription),
  photo: coach.photo
    ? {
        url: coach.photo,
        alt: coach.name,
      }
    : null,
  linkTg: coach.links?.tg || null,
  linkInst: coach.links?.inst || null,
  linkVk: coach.links?.vk || null,
  linkWa: coach.links?.wa || null,
  linkYoutube: coach.links?.youtube || null,
});

const normalizeCoachRecord = (coach: Coach): Coach => ({
  ...coach,
  slug: normalizeCoachSlug(coach.slug),
  groups: coach.groups || [],
});

const isCoachRecordValid = (
  coach: Partial<Coach> | null | undefined
): coach is Coach => Boolean(coach?.slug && coach?.name);

const FALLBACK_COACHES = COACHES_MOCK.map(mapMockCoachToCoach)
  .filter(isCoachRecordValid)
  .sort((left, right) => compareByName(left.name, right.name));

const mergeCoachesWithFallback = (coaches: Coach[]) => {
  const coachMap = new Map(
    FALLBACK_COACHES.map((coach) => [coach.slug, coach])
  );

  coaches
    .map(normalizeCoachRecord)
    .filter(isCoachRecordValid)
    .forEach((coach) => {
      coachMap.set(coach.slug, coach);
    });

  return Array.from(coachMap.values()).sort((left, right) =>
    compareByName(left.name, right.name)
  );
};

export const getFallbackCoaches = () => FALLBACK_COACHES;

export async function loadCoachesWithFallback() {
  try {
    const data = await datocmsRequest<AllCoachesResponse>({
      query: ALL_COACHES_QUERY,
    });

    if (!Array.isArray(data.allCoaches) || data.allCoaches.length === 0) {
      return getFallbackCoaches();
    }

    return mergeCoachesWithFallback(data.allCoaches);
  } catch {
    return getFallbackCoaches();
  }
}

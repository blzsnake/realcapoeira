import { datocmsRequest } from '~shared/api/datocms';
import { ALL_FILIALS_QUERY } from '~shared/api/queries/filials';
import type {
  AllFilialsResponse,
  Filial,
  FilialLinkedCoach,
  FilialScheduleItem,
  FilialWeekday,
} from '~shared/api/types/filial';
import { FILIALS_MOCK } from '~shared/mocks';
import type {
  TFilialCoachType,
  TFilialScheduleType,
  TFilialType,
} from '~shared/types/filials';

export type FilialsSource = Record<string, TFilialType[]>;
export type FilialDetailData = TFilialType & {
  heroImage: Filial['heroImage'];
  hallDescription: Filial['hallDescription'];
  trialLessonPrice: number | null;
  singleLessonPrice: number | null;
  monthlyPrice: number | null;
  coachRecords: FilialLinkedCoach[];
};

const FALLBACK_FILIALS_SOURCE = FILIALS_MOCK as FilialsSource;
let cachedFilialsSource: FilialsSource | null = null;
let cachedFilialDetails: Record<string, FilialDetailData> | null = null;
export const getFallbackFilialsSource = () => FALLBACK_FILIALS_SOURCE;

const WEEKDAY_TO_INDEX: Record<FilialWeekday, number> = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4,
  sat: 5,
  sun: 6,
};

const normalizeTime = (value: string) =>
  /^\d{2}-\d{2}$/.test(value) ? value.replace('-', ':') : value;

const slugifyFilialValue = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/["']/g, '')
    .replace(/[^a-zа-я0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '');

export const getFilialTitle = (filial: TFilialType) =>
  filial.title || filial.address.metro?.name || filial.address.city;

export const getFilialSlug = (filial: TFilialType) =>
  filial.slug ||
  slugifyFilialValue(
    `${getFilialTitle(filial)} ${filial.address.street} ${filial.address.city}`
  );

const buildFilialSchedule = (
  scheduleItems: FilialScheduleItem[]
): TFilialScheduleType[][] => {
  const schedule = Array.from({ length: 7 }, () => [] as TFilialScheduleType[]);

  scheduleItems.forEach((item) => {
    const dayIndex = WEEKDAY_TO_INDEX[item.weekday];

    if (dayIndex === undefined) {
      return;
    }

    schedule[dayIndex].push({
      id: item.groupKey,
      group: item.groupLabel?.trim() || item.groupKey,
      time: `${normalizeTime(item.timeFrom)}-${normalizeTime(item.timeTo)}`,
    });
  });

  return schedule;
};

const mapCoach = (coach: Filial['coaches'][number]): TFilialCoachType => ({
  id: coach.slug,
  name: coach.name,
  phone: coach.phone || '',
});

const isFilialRecordValid = (
  filial: Partial<Filial> | null | undefined
): filial is Filial =>
  Boolean(
    filial?.slug &&
      filial?.title &&
      filial?.cityKey &&
      filial?.street &&
      filial?.location?.latitude !== undefined &&
      filial?.location?.longitude !== undefined
  );

const mapFilialToCardData = (filial: Filial, index: number): TFilialType => {
  const lat = filial.location?.latitude ?? 0;
  const lng = filial.location?.longitude ?? 0;

  return {
    slug: filial.slug,
    title: filial.title,
    id: filial.sortOrder ?? Math.round((lat * 1000 + lng * 1000) * (index + 1)),
    coords: [lat, lng],
    city: filial.cityName,
    metro: filial.metroName || filial.cityName,
    street: filial.street,
    address: {
      city: filial.cityName,
      metro: filial.metroName
        ? {
            name: filial.metroName,
            color: filial.metroColor?.hex || '#000000',
          }
        : undefined,
      street: filial.street,
      lat,
      lng,
    },
    coaches: filial.coaches.map(mapCoach),
    schedule: buildFilialSchedule(filial.scheduleItems),
  };
};

const mapCoachRecord = (
  coach: Filial['coaches'][number]
): FilialLinkedCoach => ({
  id: coach.id,
  slug: coach.slug,
  name: coach.name,
  phone: coach.phone || '',
  level: coach.level || '',
  nick: coach.nick || '',
  photo: coach.photo || null,
});

const buildFilialsSource = (filials: Filial[]) =>
  filials.reduce<FilialsSource>((acc, filial, index) => {
    const cityKey = filial.cityKey || 'other';
    const items = acc[cityKey] || [];

    items.push(mapFilialToCardData(filial, index));
    acc[cityKey] = items;

    return acc;
  }, {});

const mapFilialToDetailData = (
  filial: Filial,
  index: number
): FilialDetailData => ({
  ...mapFilialToCardData(filial, index),
  heroImage: filial.heroImage || null,
  hallDescription: filial.hallDescription || null,
  trialLessonPrice: filial.trialLessonPrice ?? null,
  singleLessonPrice: filial.singleLessonPrice ?? null,
  monthlyPrice: filial.monthlyPrice ?? null,
  coachRecords: filial.coaches.map(mapCoachRecord),
});

const buildFilialDetailsMap = (filials: Filial[]) =>
  filials.reduce<Record<string, FilialDetailData>>((acc, filial, index) => {
    const detail = mapFilialToDetailData(filial, index);

    acc[getFilialSlug(detail)] = detail;

    return acc;
  }, {});

const mapFallbackFilialToDetailData = (
  filial: TFilialType
): FilialDetailData => ({
  ...filial,
  heroImage: null,
  hallDescription: null,
  trialLessonPrice: null,
  singleLessonPrice: null,
  monthlyPrice: null,
  coachRecords: filial.coaches.map((coach) => ({
    id: coach.id,
    slug: coach.id,
    name: coach.name,
    phone: coach.phone || '',
    level: '',
    nick: '',
    photo: null,
  })),
});

const getFallbackFilialDetails = () =>
  Object.values(getFallbackFilialsSource())
    .flat()
    .reduce<Record<string, FilialDetailData>>((acc, filial) => {
      const detail = mapFallbackFilialToDetailData(filial);

      acc[getFilialSlug(detail)] = detail;

      return acc;
    }, {});

const setFilialsCaches = (filials: Filial[]) => {
  const validFilials = filials.filter(isFilialRecordValid);
  const nextSource = buildFilialsSource(validFilials);

  cachedFilialsSource = Object.keys(nextSource).length
    ? nextSource
    : getFallbackFilialsSource();
  cachedFilialDetails = Object.keys(nextSource).length
    ? buildFilialDetailsMap(validFilials)
    : getFallbackFilialDetails();
};

export const getFallbackFilialDetail = (slug: string) =>
  getFallbackFilialDetails()[slug] || null;

export async function loadFilialsSourceWithFallback() {
  if (cachedFilialsSource) {
    return cachedFilialsSource;
  }

  try {
    const data = await datocmsRequest<AllFilialsResponse>({
      query: ALL_FILIALS_QUERY,
    });

    if (!Array.isArray(data.allFilials) || data.allFilials.length === 0) {
      cachedFilialsSource = getFallbackFilialsSource();
      cachedFilialDetails = getFallbackFilialDetails();

      return cachedFilialsSource;
    }

    setFilialsCaches(data.allFilials);

    if (!cachedFilialsSource) {
      cachedFilialsSource = getFallbackFilialsSource();
      cachedFilialDetails = getFallbackFilialDetails();
      return cachedFilialsSource;
    }

    return cachedFilialsSource;
  } catch {
    cachedFilialsSource = getFallbackFilialsSource();
    cachedFilialDetails = getFallbackFilialDetails();

    return cachedFilialsSource;
  }
}

export async function loadFilialDetailWithFallback(slug: string) {
  if (cachedFilialDetails?.[slug]) {
    return cachedFilialDetails[slug];
  }

  try {
    const data = await datocmsRequest<AllFilialsResponse>({
      query: ALL_FILIALS_QUERY,
    });

    if (!Array.isArray(data.allFilials) || data.allFilials.length === 0) {
      cachedFilialDetails = getFallbackFilialDetails();

      return cachedFilialDetails[slug] || null;
    }

    setFilialsCaches(data.allFilials);

    return cachedFilialDetails?.[slug] || getFallbackFilialDetail(slug);
  } catch {
    cachedFilialDetails = getFallbackFilialDetails();

    return cachedFilialDetails[slug] || null;
  }
}

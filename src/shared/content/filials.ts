import { datocmsRequest } from '~shared/api/datocms';
import { ALL_FILIALS_QUERY } from '~shared/api/queries/filials';
import type {
  AllFilialsResponse,
  Filial,
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

const FALLBACK_FILIALS_SOURCE = FILIALS_MOCK as FilialsSource;
let cachedFilialsSource: FilialsSource | null = null;

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

const buildFilialsSource = (filials: Filial[]) =>
  filials.reduce<FilialsSource>((acc, filial, index) => {
    const cityKey = filial.cityKey || 'other';
    const items = acc[cityKey] || [];

    items.push(mapFilialToCardData(filial, index));
    acc[cityKey] = items;

    return acc;
  }, {});

export const getFallbackFilialsSource = () => FALLBACK_FILIALS_SOURCE;

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

      return cachedFilialsSource;
    }

    const nextSource = buildFilialsSource(
      data.allFilials.filter(isFilialRecordValid)
    );

    if (!Object.keys(nextSource).length) {
      cachedFilialsSource = getFallbackFilialsSource();

      return cachedFilialsSource;
    }

    cachedFilialsSource = nextSource;

    return cachedFilialsSource;
  } catch {
    cachedFilialsSource = getFallbackFilialsSource();

    return cachedFilialsSource;
  }
}

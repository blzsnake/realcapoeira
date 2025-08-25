import type {
  TFilialCoachType,
  TFilialScheduleType,
  TFilialType,
} from '../ui/Filter/types';

export type TQuery = {
  city: string;
  group: string;
  coach: string;
};

export const filterCity = (
  obj: Record<string, TFilialType[]>,
  city: string
): TFilialType[] => {
  return obj[city];
};

export const filterAgeGroup = (
  arr: TFilialScheduleType[],
  ageGroup: string
) => {
  return ageGroup ? arr.find((item) => ageGroup.includes(item.id)) : ageGroup;
};

export const filterCoachGroup = (arr: TFilialCoachType[], coach: string) => {
  return coach ? arr.find((item) => coach.includes(item.id)) : arr;
};

export const filterFilials = (
  obj: Record<string, TFilialType[]>,
  query: TQuery
) => {
  const rawData = query.city
    ? filterCity(obj, query.city)
    : Object.values(obj).flat();

  console.log(
    'rawDaata',
    rawData,
    rawData?.filter((data: TFilialType) => {
      return (
        filterAgeGroup(data.schedule, query.group) ||
        filterCoachGroup(data.coaches, query.coach)
      );
    })
  );
  return rawData?.filter((data: TFilialType) => {
    return (
      filterAgeGroup(data.schedule, query.group) ||
      filterCoachGroup(data.coaches, query.coach)
    );
  });
};

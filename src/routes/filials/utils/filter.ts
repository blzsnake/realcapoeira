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
  return obj[city] || Object.values(obj).flat();
};

export const findAgeGroup = (arr: TFilialScheduleType[], ageGroup: string) => {
  return ageGroup && arr?.length
    ? arr.find((item) => ageGroup.includes(item.id))
    : ageGroup;
};

export const findCoachGroup = (arr: TFilialCoachType[], coach: string) => {
  return coach && arr?.length
    ? arr.find((item) => coach.includes(item.id))
    : arr;
};

export const filterFilials = (
  obj: Record<string, TFilialType[]>,
  query: TQuery
) => {
  const rawData = query.city
    ? filterCity(obj, query.city)
    : Object.values(obj).flat();

  return rawData?.filter((data: TFilialType) => {
    return data
      ? findAgeGroup(data.schedule, query.group) ||
          findCoachGroup(data.coaches, query.coach)
      : data;
  });

  // return rawData;
};

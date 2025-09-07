import { useUrl } from '@tramvai/module-router';
import { useEffect, useState } from 'react';
import { AGE_GROUPS, COACHES, GROUPED_PLACES } from '~shared/mocks';

export type TypeOption = {
  value: string;
  label: string;
};

export const useQueryParams = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<TypeOption[] | null>(
    null
  );
  const [selectedCoach, setSelectedCoach] = useState<TypeOption[] | null>(null);
  const [selectedCity, setSelectedCity] = useState<TypeOption[] | null>();
  const { query } = useUrl();
  // console.log(query)
  const setQueryParam =
    (name: string, cb?: (e: TypeOption | TypeOption[]) => null) =>
    (value: TypeOption | TypeOption[]) => {
      const val = !Array.isArray(value)
        ? value.value
        : value?.map((e: TypeOption) => e.value).join(',');
      if (!val) {
        delete query[name];
      } else {
        query[name] = val;
      }

      window.history.pushState(
        {},
        '',
        // @ts-ignore
        `/filials/?${new URLSearchParams(query).toString()}`
      );
      if (cb) {
        cb(value);
      }
    };

  const resetFilter = () => {
    window.history.pushState({}, '', '/filials/');
  };

  useEffect(() => {
    if (query.city) {
      const selected = GROUPED_PLACES.map((item) => item.options)
        .flat()
        .filter((e) => e.value === query.city);
      setSelectedCity(selected);
    } else {
      setSelectedCity(null);
    }
    if (query.group) {
      const selected = AGE_GROUPS.filter((e) => query.group.includes(e.value));
      setSelectedAgeGroup(selected);
    } else {
      setSelectedAgeGroup(null);
    }
    if (query.coach) {
      const selected = COACHES.filter((e) => query.coach.includes(e.value));
      setSelectedCoach(selected);
    } else {
      setSelectedCoach(null);
    }
  }, [query]);

  return [
    selectedAgeGroup,
    selectedCoach,
    selectedCity,
    setQueryParam,
    resetFilter,
  ];
};

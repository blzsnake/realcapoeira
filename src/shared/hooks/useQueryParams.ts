import { useMemo } from 'react';
import { useRouter, useUrl } from '@tramvai/module-router';
import type { TypeOption } from '~shared/types/filials';
import type { TypeOptionGroup } from '~shared/content/catalogs';

type QueryParamName = 'city' | 'group' | 'coach';
type QueryParamValue = TypeOption | readonly TypeOption[] | null;

type UseQueryParamsOptions = {
  pathname: string;
  cityOptions: TypeOptionGroup[];
  ageGroupOptions: TypeOption[];
  coachOptions?: TypeOption[];
};

const getQueryValue = (
  query: Record<string, string | string[] | undefined>,
  name: QueryParamName
) => {
  const value = query[name];

  return Array.isArray(value) ? value[0] || '' : value || '';
};

const getQueryEntries = (
  query: Record<string, string | string[] | undefined>
) =>
  Object.entries(query).reduce<Record<string, string>>((acc, [key, value]) => {
    if (Array.isArray(value)) {
      const [firstValue] = value;

      if (firstValue) {
        acc[key] = firstValue;
      }

      return acc;
    }

    if (value) {
      acc[key] = value;
    }

    return acc;
  }, {});

const findSelectedOptions = (
  value: string,
  options: TypeOption[]
): TypeOption[] | null => {
  if (!value) {
    return null;
  }

  const values = value.split(',').filter(Boolean);

  if (!values.length) {
    return null;
  }

  return options.filter((option) => values.includes(option.value));
};

export const useQueryParams = ({
  pathname,
  cityOptions,
  ageGroupOptions,
  coachOptions = [],
}: UseQueryParamsOptions) => {
  const router = useRouter();
  const { query } = useUrl();

  const flatCityOptions = useMemo(
    () => cityOptions.flatMap((group) => group.options),
    [cityOptions]
  );

  const selectedCity = useMemo(
    () => findSelectedOptions(getQueryValue(query, 'city'), flatCityOptions),
    [flatCityOptions, query]
  );
  const selectedAgeGroup = useMemo(
    () => findSelectedOptions(getQueryValue(query, 'group'), ageGroupOptions),
    [ageGroupOptions, query]
  );
  const selectedCoach = useMemo(
    () => findSelectedOptions(getQueryValue(query, 'coach'), coachOptions),
    [coachOptions, query]
  );

  const setQueryParam = (name: QueryParamName) => (value: QueryParamValue) => {
    const nextQuery = getQueryEntries(query);
    const values = !Array.isArray(value)
      ? value?.value
      : value.map((item) => item.value).join(',');

    if (values) {
      nextQuery[name] = values;
    } else {
      delete nextQuery[name];
    }

    const search = new URLSearchParams(nextQuery).toString();

    router.navigate(search ? `${pathname}?${search}` : pathname);
  };

  const resetFilter = () => {
    router.navigate(pathname);
  };

  return [
    selectedAgeGroup,
    selectedCoach,
    selectedCity,
    setQueryParam,
    resetFilter,
  ] as const;
};

export type { TypeOption };

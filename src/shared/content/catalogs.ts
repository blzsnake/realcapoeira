import type { Coach } from '~shared/api/types/coach';
import type { TypeOption } from '~shared/types/filials';
import type { FilialsSource } from './filials';
import { getFallbackCoaches, normalizeCoachSlug } from './coaches';
import { getFallbackFilialsSource } from './filials';

export type TypeOptionGroup = {
  label?: string;
  options: TypeOption[];
};

const compareByLabel = new Intl.Collator('ru').compare;

const AGE_GROUP_OPTIONS: TypeOption[] = [
  { value: 'junior', label: '3–6 лет' },
  { value: 'middle', label: '7–10 лет' },
  { value: 'senior', label: '11–16 лет' },
  { value: 'staff', label: '16 лет и старше' },
];

const normalizeCityLabel = (value: string) =>
  value.replace(/^г\.\s*/i, '').trim();

const toCityQueryValue = (value: string) =>
  normalizeCityLabel(value).toLowerCase().replace(/\s+/g, '_');

export const getAgeGroupOptions = () => AGE_GROUP_OPTIONS;

export const getCityOptionsFromFilialsSource = (
  source: FilialsSource = getFallbackFilialsSource()
): TypeOptionGroup[] => {
  const options = Object.entries(source)
    .map(([cityKey, filials]) => {
      const cityLabel =
        filials[0]?.address?.city || filials[0]?.city || cityKey;

      return {
        value: cityKey,
        label: normalizeCityLabel(cityLabel),
      };
    })
    .sort((left, right) => compareByLabel(left.label, right.label));

  return [{ options }];
};

export const getCityOptionsFromCoaches = (
  coaches: Coach[] = getFallbackCoaches()
): TypeOptionGroup[] => {
  const cityMap = new Map<string, TypeOption>();

  coaches.forEach((coach) => {
    if (!coach.city) {
      return;
    }

    const label = normalizeCityLabel(coach.city);
    const value = toCityQueryValue(label);

    cityMap.set(value, { value, label });
  });

  return [
    {
      options: Array.from(cityMap.values()).sort((left, right) =>
        compareByLabel(left.label, right.label)
      ),
    },
  ];
};

export const getCoachOptionsFromCoaches = (
  coaches: Coach[] = getFallbackCoaches()
): TypeOption[] => {
  const coachMap = new Map<string, TypeOption>();

  coaches.forEach((coach) => {
    if (!coach.slug || !coach.name) {
      return;
    }

    const value = normalizeCoachSlug(coach.slug);

    coachMap.set(value, {
      value,
      label: coach.name,
    });
  });

  return Array.from(coachMap.values()).sort((left, right) =>
    compareByLabel(left.label, right.label)
  );
};

export const getCoachOptionsFromFilialsSource = (
  source: FilialsSource = getFallbackFilialsSource()
) => {
  const coachMap = new Map<string, TypeOption>();

  Object.values(source)
    .flat()
    .forEach((filial) => {
      filial.coaches.forEach((coach) => {
        const value = normalizeCoachSlug(coach.id);

        coachMap.set(value, {
          value,
          label: coach.name,
        });
      });
    });

  return Array.from(coachMap.values()).sort((left, right) =>
    compareByLabel(left.label, right.label)
  );
};

export const getCityQueryValue = (value: string) => toCityQueryValue(value);

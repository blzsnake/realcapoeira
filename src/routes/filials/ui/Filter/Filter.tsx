import { useEffect, useState } from 'react';
import { useUrl } from '@tramvai/module-router';
import type { MultiValue, OptionProps, SingleValue } from 'react-select';
import Select, { components } from 'react-select';
import { Checkbox } from '~shared/ui/Checkbox/Checkbox';
import { Radio } from '~shared/ui/Radio/Radio';
import { AGE_GROUPS, COACHES, GROUPED_PLACES } from '~shared/mocks';
import { customStyles } from '~shared/ui/SignUpFormGroup/SignUpForm';

import styles from './Filter.module.css';

import type { TypeOption } from './types';

function CheckboxOption(props: OptionProps) {
  return (
    <components.Option {...props}>
      <div className={styles.CheckboxWrap}>
        <Checkbox
          checked={props.isSelected}
          text={props.label}
          onChange={() => null} // onChange обязателен, но обработку делает react-select
        />
      </div>
    </components.Option>
  );
}

function RadioOption(props: OptionProps) {
  return (
    <components.Option {...props}>
      <div className={styles.CheckboxWrap}>
        <Radio
          checked={props.isSelected}
          text={props.label}
          onChange={() => null} // onChange обязателен, но обработку делает react-select
        />
      </div>
    </components.Option>
  );
}

export function Filter() {
  const [selectedAgeGroup, setSelectedAgeGroup] =
    useState<MultiValue<TypeOption> | null>(null);
  const [selectedCoach, setSelectedCoach] =
    useState<MultiValue<TypeOption> | null>(null);
  const [selectedCity, setSelectedCity] = useState<SingleValue<TypeOption>>();
  const { query } = useUrl();
  const setQueryParam =
    (name: string, cb: () => null) => (value: TypeOption | TypeOption[]) => {
      const val = value?.label
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
        `/filials/?${new URLSearchParams(query).toString()}`
      );
      // @ts-ignore
      cb(value);
    };

  useEffect(() => {
    if (query.city) {
      const selected = GROUPED_PLACES.map((item) => item.options)
        .flat()
        .filter((e) => e.value === query.city);
      setSelectedCity(selected);
    }
    if (query.group) {
      const selected = AGE_GROUPS.filter((e) => query.group.includes(e.value));
      setSelectedAgeGroup(selected);
    }
    if (query.coach) {
      const selected = COACHES.filter((e) => query.coach.includes(e.id));
      setSelectedCoach(selected);
    }
  }, [query]);

  return (
    <div className={styles.Filter}>
      <div className={styles.FilterItem}>
        <Select
          name="city"
          options={GROUPED_PLACES}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: RadioOption }}
          // @ts-ignore
          onChange={setQueryParam('city', setSelectedCity)}
          value={selectedCity}
          styles={customStyles}
          isSearchable={false}
          placeholder="Город"
          maxMenuHeight={500}
        />
      </div>
      <div className={styles.FilterItem}>
        <Select
          name="group"
          options={AGE_GROUPS}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          // @ts-ignore
          onChange={setQueryParam('group', setSelectedAgeGroup)}
          value={selectedAgeGroup}
          styles={customStyles}
          controlShouldRenderValue={false}
          isSearchable={false}
          placeholder="Возраст ученика"
        />
      </div>
      <div className={styles.FilterItem}>
        <Select
          name="coach"
          options={COACHES}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          // @ts-ignore
          onChange={setQueryParam('coach', setSelectedCoach)}
          value={selectedCoach}
          styles={customStyles}
          controlShouldRenderValue={false}
          isSearchable={false}
          placeholder="Тренер"
        />
      </div>
    </div>
  );
}

export default Filter;

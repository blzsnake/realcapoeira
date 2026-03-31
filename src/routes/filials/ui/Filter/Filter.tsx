import type { OptionProps } from 'react-select';
import Select, { components } from 'react-select';
import {
  getAgeGroupOptions,
  type TypeOptionGroup,
} from '~shared/content/catalogs';
import { useQueryParams } from '~shared/hooks/useQueryParams';
import { Checkbox } from '~shared/ui/Checkbox/Checkbox';
import { Radio } from '~shared/ui/Radio/Radio';
import { customStyles } from '~shared/ui/SignUpFormGroup/SignUpForm';

import styles from './Filter.module.css';

import type { TypeOption } from './types';

type FilterProps = {
  cityOptions: TypeOptionGroup[];
  coachOptions: TypeOption[];
};

function CheckboxOption(props: OptionProps) {
  return (
    <components.Option {...props}>
      <div className={styles.CheckboxWrap}>
        <Checkbox
          checked={props.isSelected}
          text={props.label}
          onChange={() => null}
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
          onChange={() => null}
        />
      </div>
    </components.Option>
  );
}

export function Filter({ cityOptions, coachOptions }: FilterProps) {
  const [selectedAgeGroup, selectedCoach, selectedCity, setQueryParam] =
    useQueryParams({
      pathname: '/filials',
      cityOptions,
      ageGroupOptions: getAgeGroupOptions(),
      coachOptions,
    });

  return (
    <div className={styles.Filter}>
      <div className={styles.FilterItem}>
        <Select
          name="city"
          options={cityOptions}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: RadioOption }}
          onChange={setQueryParam('city')}
          value={selectedCity?.[0] || null}
          styles={customStyles}
          isSearchable={false}
          placeholder="Город"
          maxMenuHeight={500}
        />
      </div>
      <div className={styles.FilterItem}>
        <Select
          name="group"
          options={getAgeGroupOptions()}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          onChange={setQueryParam('group')}
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
          options={coachOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          onChange={setQueryParam('coach')}
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

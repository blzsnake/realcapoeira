import type { OptionProps } from 'react-select';
import Select, { components } from 'react-select';
import {
  getAgeGroupOptions,
  type TypeOptionGroup,
} from '~shared/content/catalogs';
import { customStyles } from '~shared/ui/SignUpFormGroup/SignUpForm';
import { Radio } from '~shared/ui/Radio/Radio';
import { Checkbox } from '~shared/ui/Checkbox/Checkbox';
import { useQueryParams } from '~shared/hooks/useQueryParams';
import styles from './Filter.module.css';

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

type FilterProps = {
  cityOptions: TypeOptionGroup[];
};

export function Filter({ cityOptions }: FilterProps) {
  const [selectedAgeGroup, , selectedCity, setQueryParam] = useQueryParams({
    pathname: '/coaches',
    cityOptions,
    ageGroupOptions: getAgeGroupOptions(),
    coachOptions: [],
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
          placeholder="Группы"
        />
      </div>
    </div>
  );
}

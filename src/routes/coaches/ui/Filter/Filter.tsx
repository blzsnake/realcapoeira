import classNames from 'classnames';
import { Typography } from '~shared/ui/typography';
import { MobileSelector } from '~shared/ui/MobileSelector';
import { CITIES } from '~shared/consts/cities';
import type { MultiValue, OptionProps, SingleValue } from 'react-select';
import Select, { components } from 'react-select';
import { customStyles } from '~shared/ui/SignUpFormGroup/SignUpForm';
import { Radio } from '~shared/ui/Radio/Radio';
import { Checkbox } from '~shared/ui/Checkbox/Checkbox';
import { useQueryParams } from '~shared/hooks/useQueryParams';
import { AGE_GROUPS, GROUPED_PLACES } from '~shared/mocks';
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

export function Filter() {
  const [selectedAgeGroup, selectedCoach, selectedCity, setQueryParam] =
    useQueryParams();

  console.log(setQueryParam, '---');

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
          onChange={setQueryParam('city')}
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

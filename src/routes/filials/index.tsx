import { YMaps, Map } from '@pbe/react-yandex-maps';
import Select, { components } from 'react-select';
import { FILIALS_MOCK } from '~shared/mocks';
import { useState } from 'react';
import { FilialCard } from './ui/FilialCard/FilialCard';

import styles from './Filials.module.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function CheckboxOption(props) {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null} // onChange обязателен, но обработку делает react-select
      />
      <label>{props.label}</label>
    </components.Option>
  );
}
export function FilialsPage() {
  const [selectedOption, setSelectedOption] = useState(options[1]);

  return (
    <YMaps query={{ apikey: 'fcf49c8d-b16f-4277-ab7a-d08242e838b8' }}>
      <main className={styles.Wrap}>
        <div className={styles.InfoWrap}>
          <div className={styles.SelectList}>
            <Select
              options={options}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option: CheckboxOption }}
              onChange={setSelectedOption}
              value={selectedOption}
            />
          </div>
          <div className={styles.FilialsList}>
            {FILIALS_MOCK.map(FilialCard)}
          </div>
        </div>
        <div className={styles.MapWrap}>
          <Map
            style={{ width: '100%', height: '100vh' }}
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          />
        </div>
      </main>
    </YMaps>
  );
}

FilialsPage.seo = {
  metaTags: {
    title: 'Филиалы Real Capoeira',
  },
};

export default FilialsPage;

import { YMaps, Map } from '@pbe/react-yandex-maps';
import { useUrl } from '@tramvai/module-router';
import { FILIALS_MOCK } from '~shared/mocks';
import { useState } from 'react';
import { FilialCard } from './ui/FilialCard/FilialCard';
import { Filter } from './ui/Filter/Filter';

import styles from './Filials.module.css';
import { filterFilials } from './utils/filter';

export function FilialsPage() {
  const { query } = useUrl();

  console.log(filterFilials(FILIALS_MOCK, query));
  return (
    <YMaps query={{ apikey: 'fcf49c8d-b16f-4277-ab7a-d08242e838b8' }}>
      <main className={styles.Wrap}>
        <div className={styles.InfoWrap}>
          <div className={styles.Filter}>
            <Filter />
          </div>
          <div className={styles.FilialsList}>
            {filterFilials(FILIALS_MOCK, query).map((item) => (
              <FilialCard {...item} key={item.address.street} />
            ))}
          </div>
        </div>
        <div className={styles.MapWrap}>
          <Map
            style={{ width: '100%', height: '100%', maxHeight: '100vh' }}
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

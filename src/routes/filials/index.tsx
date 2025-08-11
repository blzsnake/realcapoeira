import { YMaps, Map } from '@iminside/react-yandex-maps';
import { FilialCard } from './ui/FilialCard/FilialCard';

import styles from './Filials.module.css';
import { FILIALS_MOCK } from './mock';

export function FilialsPage() {
  return (
    <YMaps query={{ apikey: 'fcf49c8d-b16f-4277-ab7a-d08242e838b8' }}>
      <main className={styles.Wrap}>
        <div className={styles.InfoWrap}>
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

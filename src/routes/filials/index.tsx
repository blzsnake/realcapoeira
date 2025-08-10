import { YMaps, Map } from '@iminside/react-yandex-maps';
import { FilialCard } from './ui/FilialCard/FilialCard';

import styles from './Filials.module.css';

const FILIALS_MOCK = [
  {
    address: {
      city: 'г. Москва',
      metro: {
        name: 'Войковская',
        color: '#09A652',
      },
      street: ', ул. Флотская, 25',
      lat: 0,
      lng: 0,
    },
    coaches: [
      {
        name: 'Александр Рогозин',
        phone: '+7 (495) 432 34 22',
      },
      {
        name: 'Алексей Магдыч',
        phone: '+7 (495) 432 34 22',
      },
    ],
  },
  {
    address: {
      city: 'г. Москва',
      metro: {
        name: 'Белорусская',
        color: '#09A652',
      },
      street: 'ул. Новолесная, 6 Б, с1',
      lat: 0,
      lng: 0,
    },
    coaches: [
      {
        name: 'Рамиль Миннуллин',
        phone: '+7 (926) 690 61 47',
      },
    ],
  },
  {
    address: {
      city: 'г. Москва',
      metro: {
        name: 'Медведково',
        color: '#F2994A',
      },
      street: 'ул. Комминтерна, 25',
      lat: 0,
      lng: 0,
    },
    coaches: [
      {
        name: 'Александр Рогозин',
        phone: '+7 (495) 432 34 22',
      },
    ],
  },
  {
    address: {
      city: 'г. Москва',
      metro: {
        name: 'Динамо',
        color: '#09A652',
      },
      street: 'ул. Полярная, 25, ДК «Динамо»',
      lat: 0,
      lng: 0,
    },
    coaches: [
      {
        name: 'Александр Рогозин',
        phone: '+7 (495) 432 34 22',
      },
    ],
  },
];

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

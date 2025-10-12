import { Typography } from '~shared/ui/typography';
import { COACHES } from '~shared/mocks';
import { Filter } from './ui/Filter/Filter';
import { CoachCard } from './ui/CoachCard';

import styles from './Coaches.module.css';

export function CoachesPage() {
  // добавить фильтрацию
  const coachesFitered = COACHES.filter((el) => el.id);
  return (
    <main className={styles.Wrap}>
      <div className={styles.Header}>
        <Typography component="h1" className={styles.Title}>
          Тренеры
        </Typography>
        <Filter />
      </div>
      <div className={styles.Coaches}>{coachesFitered.map(CoachCard)}</div>
    </main>
  );
}

CoachesPage.seo = {
  metaTags: {
    title: 'Тренеры Real Capoeira',
  },
};

export default CoachesPage;

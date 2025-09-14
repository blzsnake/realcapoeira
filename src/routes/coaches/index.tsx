import { Typography } from '~shared/ui/typography';
import styles from './Coaches.module.css';
import { Filter } from './ui/Filter/Filter';

export function CoachesPage() {
  return (
    <main className={styles.Wrap}>
      <div className={styles.Header}>
        <Typography component="h1" className={styles.Title}>
          Тренеры
        </Typography>
        <Filter />
      </div>
    </main>
  );
}

CoachesPage.seo = {
  metaTags: {
    title: 'Тренеры Real Capoeira',
  },
};

export default CoachesPage;

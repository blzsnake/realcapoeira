import { useQueryParams } from '~shared/hooks/useQueryParams';
import { Typography } from '~shared/ui/typography';
import { COACHES } from '~shared/mocks/coaches';
import { Filter } from './ui/Filter/Filter';
import { CoachCard } from './ui/CoachCard';

import styles from './Coaches.module.css';

export function CoachesPage() {
  const [selectedAgeGroup, _, selectedCity] = useQueryParams();

  const coachesFitered = COACHES.filter((el) => el.id)
    .filter((el) =>
      selectedCity?.length
        ? selectedCity[0].label?.toLowerCase() === el.city?.toLowerCase()
        : true
    )
    .filter((el) =>
      selectedAgeGroup?.length
        ? selectedAgeGroup?.find((i) => el.groups?.includes(i.value))
        : true
    );
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

import { useEffect } from 'react';
import { useSelector, useActions } from '@tramvai/state';
import { declareAction } from '@tramvai/core';
import { useQueryParams } from '~shared/hooks/useQueryParams';
import { Typography } from '~shared/ui/typography';
import { datocmsRequest } from '~shared/api/datocms';
import { ALL_COACHES_QUERY } from '~shared/api/queries/coaches';
import { CoachesStore, setCoaches } from '~shared/stores/coaches';
import type { AllCoachesResponse } from '~shared/api/types/coach';
import { Filter } from './ui/Filter/Filter';
import { CoachCard } from './ui/CoachCard';

import styles from './Coaches.module.css';

/**
 * Tramvai action — загружает тренеров из DatoCMS.
 * При SSG выполняется на этапе сборки.
 * При SPA-навигации выполняется на клиенте (но данные уже в store если пришли с главной).
 */
const fetchCoachesAction = declareAction({
  name: 'fetchCoaches',
  async fn() {
    const currentCoaches = this.getState(CoachesStore);

    // Если данные уже загружены — не запрашиваем повторно
    if (currentCoaches.length > 0) {
      return;
    }

    try {
      const data = await datocmsRequest<AllCoachesResponse>({
        query: ALL_COACHES_QUERY,
      });

      this.dispatch(setCoaches(data.allCoaches));
    } catch (error) {
      console.error('Failed to fetch coaches from DatoCMS:', error);
    }
  },
  conditions: {
    onlyBrowser: true,
  },
});

export function CoachesPage() {
  const coaches = useSelector(CoachesStore, (state) => state.coaches);
  const [selectedAgeGroup, _, selectedCity] = useQueryParams();

  const coachesFiltered = coaches
    ?.filter((el) => el.slug)
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, []);

  return (
    <main className={styles.Wrap}>
      <div className={styles.Header}>
        <Typography component="h1" className={styles.Title}>
          Тренеры
        </Typography>
        <Filter />
      </div>
      <div className={styles.Coaches}>
        {coachesFiltered.map((coach) => (
          <CoachCard
            key={coach.slug}
            name={coach.name}
            level={coach.level}
            photo={coach.photo?.url || ''}
            slug={coach.slug}
            nick={coach.nick}
          />
        ))}
      </div>
    </main>
  );
}

CoachesPage.actions = [fetchCoachesAction];

CoachesPage.seo = {
  metaTags: {
    title: 'Тренеры Real Capoeira',
  },
};

export default CoachesPage;

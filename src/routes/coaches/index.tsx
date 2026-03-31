import { useEffect } from 'react';
import { useSelector } from '@tramvai/state';
import { declareAction } from '@tramvai/core';
import { useQueryParams } from '~shared/hooks/useQueryParams';
import {
  getAgeGroupOptions,
  getCityOptionsFromCoaches,
  getCityQueryValue,
} from '~shared/content/catalogs';
import { Typography } from '~shared/ui/typography';
import { CoachesStore, setCoaches } from '~shared/stores/coaches';
import {
  getFallbackCoaches,
  loadCoachesWithFallback,
  sortCoachesForList,
} from '~shared/content/coaches';
import { Filter } from './ui/Filter/Filter';
import { CoachCard } from './ui/CoachCard';

import styles from './Coaches.module.css';

/**
 * Tramvai action — загружает тренеров через content-layer.
 * На сервере и в браузере использует одинаковый fallback на моки.
 */
const fetchCoachesAction = declareAction({
  name: 'fetchCoaches',
  async fn() {
    const currentCoaches = this.getState(CoachesStore);

    if (typeof window === 'undefined' && currentCoaches.length > 0) {
      return;
    }

    const coaches = await loadCoachesWithFallback();

    if (coaches !== currentCoaches) {
      this.dispatch(setCoaches(coaches));
    }
  },
});

export function CoachesPage() {
  const coaches = useSelector(CoachesStore, (state) => state.coaches);
  const cityOptions = getCityOptionsFromCoaches(
    coaches.length ? coaches : getFallbackCoaches()
  );
  const [selectedAgeGroup, , selectedCity] = useQueryParams({
    pathname: '/coaches',
    cityOptions,
    ageGroupOptions: getAgeGroupOptions(),
    coachOptions: [],
  });

  const coachesFiltered = coaches
    ?.filter((el) => el.slug)
    .filter((el) =>
      selectedCity?.length
        ? selectedCity[0].value === getCityQueryValue(el.city || '')
        : true
    )
    .filter((el) =>
      selectedAgeGroup?.length
        ? selectedAgeGroup?.find((i) => el.groups?.includes(i.value))
        : true
    );
  const coachesSorted = sortCoachesForList(coachesFiltered);

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
        <Filter cityOptions={cityOptions} />
      </div>
      <div className={styles.Coaches}>
        {coachesSorted.map((coach) => (
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

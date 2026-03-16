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
} from '~shared/content/coaches';
import { Filter } from './ui/Filter/Filter';
import { CoachCard } from './ui/CoachCard';

import styles from './Coaches.module.css';

const COACH_LEVEL_ORDER = [
  'contra-mestre',
  'professor',
  'instrutor',
  'monitor',
  'minitor',
] as const;

const COACH_LEVEL_ALIASES: Record<string, (typeof COACH_LEVEL_ORDER)[number]> =
  {
    'contra-mestra': 'contra-mestre',
    professora: 'professor',
    instrutora: 'instrutor',
    monitora: 'monitor',
    minitora: 'minitor',
  };

const compareByName = new Intl.Collator('ru').compare;

const getCoachLevelRank = (level: string) => {
  const normalizedLevel = level.trim().toLowerCase();
  const baseLevel = COACH_LEVEL_ALIASES[normalizedLevel] || normalizedLevel;
  const rank = COACH_LEVEL_ORDER.indexOf(
    baseLevel as (typeof COACH_LEVEL_ORDER)[number]
  );

  return rank === -1 ? COACH_LEVEL_ORDER.length : rank;
};

/**
 * Tramvai action — загружает тренеров через content-layer.
 * На сервере и в браузере использует одинаковый fallback на моки.
 */
const fetchCoachesAction = declareAction({
  name: 'fetchCoaches',
  async fn() {
    const currentCoaches = this.getState(CoachesStore);

    // Если данные уже загружены — не запрашиваем повторно
    if (currentCoaches.length > 0) {
      return;
    }

    const coaches = await loadCoachesWithFallback();

    this.dispatch(setCoaches(coaches));
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
    )
    .sort((left, right) => {
      const rankDiff =
        getCoachLevelRank(left.level) - getCoachLevelRank(right.level);

      return rankDiff || compareByName(left.name, right.name);
    });

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

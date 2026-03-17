import { useEffect, useState } from 'react';
import {
  getCachedHomeStats,
  getFallbackHomeStats,
  loadHomeStatsWithFallback,
  type HomeStats,
} from '~shared/content/stats';
import { Typography } from '~shared/ui/typography';
import styles from './Stats.module.css';

const formatInteger = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(value);

export function Stats() {
  const [stats, setStats] = useState<HomeStats>(
    getCachedHomeStats() ?? getFallbackHomeStats()
  );

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        const nextStats = await loadHomeStatsWithFallback();

        if (!isMounted) {
          return;
        }

        setStats(nextStats);
      } catch {
        // Keep fallback values if the client request fails.
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.Stats}>
      <div className={styles.Item}>
        <Typography weight="demiBold" className={styles.Caption}>
          Обучаем капоэйре
        </Typography>
        <Typography weight="demiBold" className={styles.Number}>
          {stats.trainingYears}&nbsp;лет
        </Typography>
      </div>

      <div className={styles.Items}>
        <div className={styles.Item}>
          <Typography weight="demiBold" className={styles.Caption}>
            Филиалов
          </Typography>
          <Typography weight="demiBold" className={styles.Number}>
            {formatInteger(stats.quantityFilials)}
          </Typography>
        </div>
        <div className={styles.Item}>
          <Typography weight="demiBold" className={styles.Caption}>
            Учеников
          </Typography>
          <Typography weight="demiBold" className={styles.Number}>
            {formatInteger(stats.quantityTraineers)}+
          </Typography>
        </div>
      </div>
    </div>
  );
}

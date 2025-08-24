import { Typography } from '~shared/ui/typography';
import styles from './Stats.module.css';

export function Stats() {
  return (
    <div className={styles.Stats}>
      <div className={styles.Item}>
        <Typography weight="demiBold" className={styles.Caption}>
          Обучаем капоэйре
        </Typography>
        <Typography weight="demiBold" className={styles.Number}>
          18 лет
        </Typography>
      </div>

      <div className={styles.Items}>
        <div className={styles.Item}>
          <Typography weight="demiBold" className={styles.Caption}>
            Филиалов
          </Typography>
          <Typography weight="demiBold" className={styles.Number}>
            45
          </Typography>
        </div>
        <div className={styles.Item}>
          <Typography weight="demiBold" className={styles.Caption}>
            Учеников
          </Typography>
          <Typography weight="demiBold" className={styles.Number}>
            1&nbsp;300+
          </Typography>
        </div>
      </div>
    </div>
  );
}

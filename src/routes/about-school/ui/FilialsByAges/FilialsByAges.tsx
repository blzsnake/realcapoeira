import { Typography } from '~shared/ui/typography';
import BabyMobile from '~app/assets/BabyMobile.svg?react';
import KidMobile from '~app/assets/KidMobile.svg?react';
import TeenMobile from '~app/assets/TeenMobile.svg?react';
import AdultMobile from '~app/assets/AdultMobile.svg?react';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import styles from './FilialsByAges.module.css';

export function FilialsByAges() {
  return (
    <div className={styles.Grid}>
      <div className={styles.Card}>
        <Typography className={styles.Title}>Дети 3-6 лет</Typography>

        <BabyMobile />

        <ArrowRight width={24} height={24} className={styles.ArrowRight} />
      </div>
      <div className={styles.Card}>
        <Typography className={styles.Title}>Дети 7–10 лет</Typography>

        <KidMobile />

        <ArrowRight width={24} height={24} className={styles.ArrowRight} />
      </div>
      <div className={styles.Card}>
        <Typography className={styles.Title}>Дети 11–15 лет</Typography>

        <TeenMobile />

        <ArrowRight width={24} height={24} className={styles.ArrowRight} />
      </div>
      <div className={styles.Card}>
        <Typography className={styles.Title}>
          Взрослые и подростки 16+
        </Typography>

        <AdultMobile />

        <ArrowRight width={24} height={24} className={styles.ArrowRight} />
      </div>
    </div>
  );
}

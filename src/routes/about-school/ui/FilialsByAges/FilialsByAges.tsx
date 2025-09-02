import { Link } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
import BabyMobile from '~app/assets/BabyMobile.svg?react';
import KidMobile from '~app/assets/KidMobile.svg?react';
import TeenMobile from '~app/assets/TeenMobile.svg?react';
import AdultMobile from '~app/assets/AdultMobile.svg?react';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import styles from './FilialsByAges.module.css';

export function FilialsByAges() {
  return (
    <article className={styles.Content}>
      <div className={styles.HiddenPlug} />
      <div className={styles.Column}>
        <Typography component="h3" weight="demiBold" className={styles.Header}>
          Филиалы по возрастам
        </Typography>
        <div className={styles.Grid}>
          <Link url="/filials/?group=junior" className={styles.Card}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 3-6 лет
            </Typography>

            <BabyMobile />

            <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          </Link>
          <Link url="/filials/?group=middle" className={styles.Card}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 7–10 лет
            </Typography>

            <KidMobile />

            <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          </Link>
          <Link url="/filials/?group=senior" className={styles.Card}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 11–15 лет
            </Typography>

            <TeenMobile />

            <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          </Link>
          <Link url="/filials/?group=staff" className={styles.Card}>
            <Typography className={styles.Title} weight="demiBold">
              Взрослые и подростки 16+
            </Typography>

            <AdultMobile />

            <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          </Link>
        </div>
      </div>
    </article>
  );
}

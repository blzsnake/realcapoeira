import cn from 'classnames';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import ARogozin from '~app/assets/coaches/s.rogozin.png';
import TRogozin from '~app/assets/coaches/t.rogozin.png';
import DBarhatov from '~app/assets/coaches/d.barhatov.png';
import AMagdych from '~app/assets/coaches/a.magdych.png';
import styles from './CoachCard.module.css';
import type { TCoachCardProps } from './types';

const FALLBACK_PHOTO_MAP: Record<string, string> = {
  'a.rogozin': ARogozin,
  't.rogozin': TRogozin,
  'd.barhatov': DBarhatov,
  'a.magdych': AMagdych,
};

export function CoachCard({ name, level, photo, id, nick }: TCoachCardProps) {
  console.log(level?.replace(/\W/g, ''), 'xxx');
  return (
    <div className={styles.CoachCard}>
      <div className={cn({ [styles[level?.replace(/\W/g, '')]]: level })}>
        <img
          src={photo || FALLBACK_PHOTO_MAP[id]}
          alt={name}
          className={styles.Photo}
        />
      </div>
      <Typography weight="demiBold" className={styles.Name}>
        {name}
      </Typography>
      <Typography className={styles.Level}>{`${level} ${nick}`}</Typography>
      <div className={styles.Buttons}>
        <Button color="white" url="">
          О тренере
        </Button>
        <Button color="white" url="">
          Филиалы
        </Button>
      </div>
    </div>
  );
}

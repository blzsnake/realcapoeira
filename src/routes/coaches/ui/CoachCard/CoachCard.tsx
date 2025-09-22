import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import ARogozin from '~app/assets/coaches/a.rogozin.png';
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

export function CoachCard({ name, level, photo, id }: TCoachCardProps) {
  return (
    <div className={styles.CoachCard}>
      <img
        src={photo || FALLBACK_PHOTO_MAP[id]}
        alt={name}
        className={styles.Photo}
      />
      <Typography weight="demiBold" className={styles.Name}>
        {name}
      </Typography>
      <Typography className={styles.Level}>{level}</Typography>
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

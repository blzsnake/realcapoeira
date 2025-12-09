import { useRouter, Link } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import styles from './CoachCard.module.css';
import type { TCoachCardProps } from './types';
import { COACH_PHOTOS } from '../../utils';
import { CoachAvatar } from '../CoachAvatar';

export function CoachCard({ name, level, photo, id, nick }: TCoachCardProps) {
  const router = useRouter();
  return (
    <div
      className={styles.CoachCard}
      onClick={() => router.navigate(`/coaches/${id?.replace('.', '_')}`)}
    >
      <CoachAvatar
        photo={photo || COACH_PHOTOS[id]}
        name={name}
        level={level}
        variant="small"
      />
      <Typography weight="demiBold" className={styles.Name}>
        {name}
      </Typography>
      <Typography className={styles.Level}>{`${level} ${nick}`}</Typography>
      <div className={styles.Buttons}>
        <Button target="_self" color="white" url="">
          О тренере
        </Button>
        <Button target="_self" color="white" url={`/filials?coach=${id}`}>
          Филиалы
        </Button>
      </div>
    </div>
  );
}

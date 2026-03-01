import { useRouter } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import styles from './CoachCard.module.css';
import type { TCoachCardProps } from './types';
import { CoachAvatar } from '../CoachAvatar';

export function CoachCard({ name, level, photo, slug, nick }: TCoachCardProps) {
  const router = useRouter();
  return (
    <div
      className={styles.CoachCard}
      onClick={() => router.navigate(`/coaches/${slug}`)}
    >
      <CoachAvatar
        photo={photo || ''}
        name={name}
        level={level}
        variant="small"
      />
      <Typography weight="demiBold" className={styles.Name}>
        {name}
      </Typography>
      <Typography className={styles.Level}>{`${level} ${nick}`}</Typography>
      <div className={styles.Buttons}>
        <Button
          target="_self"
          color="white"
          onClick={(event) =>
            event?.stopPropagation() || router.navigate(`/coaches/${slug}`)
          }
        >
          О тренере
        </Button>
        <Button
          target="_self"
          color="white"
          onClick={(event) =>
            event?.stopPropagation() ||
            router.navigate(`/filials?coach=${slug}`)
          }
        >
          Филиалы
        </Button>
      </div>
    </div>
  );
}

import { Typography } from '~shared/ui/typography';
import SchoolTeam from '~app/assets/SchoolTeam.png';
import styles from './HeaderPart.module.css';

export function HeaderPart() {
  return (
    <div className={styles.Content}>
      <div className={styles.MainInfo}>
        <Typography component="h1" weight="demiBold" className={styles.Title}>
          О ШКОЛЕ
        </Typography>
        <Typography component="h2" className={styles.Description}>
          Это место, куда хочется приходить каждый день, где тебя окружают
          друзья и приятные впечатления от самого себя
        </Typography>
      </div>
      <img src={SchoolTeam} className={styles.Image} alt="Команда" />
    </div>
  );
}

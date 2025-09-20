import { Typography } from '~shared/ui/typography';
import CapoeiraPicture from '~app/assets/CapoeiraPicture.png';
import styles from './HeaderPart.module.css';

export function HeaderPart() {
  return (
    <div className={styles.Wrap} id="#headerScrollMarker">
      <img src={CapoeiraPicture} className={styles.Image} alt="Команда" />
      <div className={styles.Content}>
        <div className={styles.MainInfo}>
          <Typography
            component="h1"
            color="white"
            weight="demiBold"
            className={styles.Title}
          >
            КАПОЭЙРА
          </Typography>
          <Typography
            component="h2"
            color="white"
            className={styles.Description}
          >
            Не просто спорт — часть культурного наследия ЮНЕСКО
          </Typography>
        </div>
      </div>
    </div>
  );
}

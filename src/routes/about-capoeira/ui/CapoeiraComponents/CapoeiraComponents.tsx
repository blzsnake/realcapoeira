import { Typography } from '~shared/ui/typography';
import CapoeiraPicture from '~app/assets/CapoeiraPicture.png';
import styles from './CapoeiraComponents.module.css';

export function CapoeiraComponents() {
  return (
    <div className={styles.Wrap} id="#headerScrollMarker">
      <Typography
        component="h3"
        weight="demiBold"
        className={styles.Title}
        color="white"
      >
        Великие мастера
      </Typography>
    </div>
  );
}

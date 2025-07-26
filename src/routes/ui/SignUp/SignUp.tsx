import { Typography } from '~shared/ui/typography';
import DreamTeam from '../../../app/assets/dream_team_photo.png';

import styles from './SignUp.module.css';

export function SignUp() {
  return (
    <div className={styles.SignUp}>
      <Typography weight="demiBold" className={styles.Heading} component="h2">
        Первое занятие — бесплатно
      </Typography>
      <Typography className={styles.Subheading}>
        Начните свой путь к силе, ловкости и мастерству
      </Typography>
      <img src={DreamTeam} className={styles.Image} alt="Команда" />
    </div>
  );
}

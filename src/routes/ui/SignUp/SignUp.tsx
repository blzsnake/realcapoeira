import { Typography } from '~shared/ui/typography';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import DreamTeam from '~app/assets/dream_team_photo.png';

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
      <SignUpFormGroup
        title="Запишитесь за пару минут"
        description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
        phone="+7 (925) 555 00 77"
      />
    </div>
  );
}

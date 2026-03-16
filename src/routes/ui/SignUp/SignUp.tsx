import { useMemo } from 'react';
import { useSelector } from '@tramvai/state';
import { Typography } from '~shared/ui/typography';
import { getSignUpFilialOptionsFromSource } from '~shared/content/filials';
import { FilialsStore } from '~shared/stores/filials';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import DreamTeam from '~app/assets/dream_team_photo.png';

import styles from './SignUp.module.css';

export function SignUp() {
  const filialsSource = useSelector(FilialsStore, (state) => state.filials);
  const filialOptions = useMemo(
    () =>
      Object.keys(filialsSource).length
        ? getSignUpFilialOptionsFromSource(filialsSource)
        : undefined,
    [filialsSource]
  );

  return (
    <div className={styles.SignUp} id="signup">
      <Typography weight="demiBold" className={styles.Heading} component="h2">
        Первое занятие — бесплатно
      </Typography>

      <div className={styles.Column}>
        <Typography className={styles.Subheading}>
          Начните свой путь к силе, ловкости и мастерству
        </Typography>
        <div className={styles.ImageWrap}>
          <img src={DreamTeam} className={styles.Image} alt="Команда" />
        </div>
        <div className={styles.FormWrap}>
          <SignUpFormGroup
            title="Запишитесь за пару минут"
            description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
            phone="+7 (925) 555 00 77"
            filialOptions={filialOptions}
          />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Typography } from '~shared/ui/typography';
import {
  getFallbackSignUpFilialOptions,
  loadSignUpFilialOptionsWithFallback,
} from '~shared/content/filials';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import DreamTeam from '~app/assets/dream_team_photo.png';
import type { TypeOption } from '~shared/types/filials';

import styles from './SignUp.module.css';

export function SignUp() {
  const [filialOptions, setFilialOptions] = useState<TypeOption[]>(
    getFallbackSignUpFilialOptions
  );

  useEffect(() => {
    let cancelled = false;

    loadSignUpFilialOptionsWithFallback()
      .then((nextFilialOptions) => {
        if (!cancelled) {
          setFilialOptions(nextFilialOptions);
        }
      })
      .catch(() => {
        // Keep snapshot-based options if the client request fails.
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

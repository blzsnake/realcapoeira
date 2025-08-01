import { Link } from '@tramvai/module-router';
import cn from 'classnames';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { SignUpForm } from './SignUpForm/SignUpForm';
import Telegram from '../../../app/assets/telegram.svg?react';
import styles from './SignUpFormGroup.module.css';
import type { TSignUpFormGroupProps } from './types';

export function SignUpFormGroup({
  theme = 'grey',
  title,
  description,
  phone,
  children,
}: TSignUpFormGroupProps) {
  return (
    <div className={cn(styles.SignUpFormGroup, styles[theme])}>
      <div className={styles.Info}>
        {children || (
          <>
            <Typography weight="demiBold" className={styles.Title}>
              {title}
            </Typography>
            <Typography className={styles.Description}>
              {description}
            </Typography>
            <Typography className={styles.Phone}>{phone}</Typography>
            <div className={styles.Buttons}>
              <Button>
                <Telegram className={styles.SocialLink} />
                <span className="isTablet">Написать в&nbsp;</span>Telegram
              </Button>
              <Button>
                <Telegram className={styles.SocialLink} />
                <span className="isTablet">Написать в&nbsp;</span>WhatsApp
              </Button>
            </div>
          </>
        )}
      </div>
      <div className={styles.Form}>
        <SignUpForm />
      </div>
    </div>
  );
}

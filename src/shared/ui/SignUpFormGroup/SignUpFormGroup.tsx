import cn from 'classnames';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import Telegram from '~app/assets/telegram.svg?react';
import Whatsapp from '~app/assets/whatsapp.svg?react';
import { SignUpForm } from './SignUpForm';
import styles from './SignUpFormGroup.module.css';
import type { TSignUpFormGroupProps } from './types';

export function SignUpFormGroup({
  theme = 'grey',
  title,
  description,
  phone,
  className,
  children,
}: TSignUpFormGroupProps) {
  return (
    <div
      className={cn(styles.SignUpFormGroup, styles[theme], className)}
      id="signup"
    >
      <div className={styles.Info}>
        {children || (
          <>
            {title ? (
              <Typography weight="demiBold" className={styles.Title}>
                {title}
              </Typography>
            ) : null}
            <Typography className={styles.Description}>
              {description}
            </Typography>
            <Typography className={styles.Phone}>
              <a
                href={`tel:${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.Link}
              >
                {phone}
              </a>
            </Typography>
            <div className={styles.Buttons}>
              <Button url="https://t.me/+79255550077">
                <Telegram className={styles.SocialLink} />
                <span className={styles.Prefix}>Написать в</span>&nbsp;Telegram
              </Button>
              <Button url="https://wa.me/+79255550077">
                <Whatsapp className={styles.SocialLink} />
                <span className={styles.Prefix}>Написать в&nbsp;</span>WhatsApp
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

import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import Telegram from '../../../../app/assets/telegram.svg?react';
import styles from './ContactsPart.module.css';

export function ContactsPart() {
  return (
    <div className={styles.Content}>
      <Typography weight="medium" className={styles.Title}>
        КОНТАКТЫ
      </Typography>
      <div className={styles.ContactsWrap}>
        <div className={styles.Column}>
          <Typography weight="demiBold" className={styles.Number}>
            +7 (925) 555 00 77
          </Typography>
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
        </div>
        <div className={styles.Column}>
          <Typography weight="demiBold" className={styles.Text}>
            По вопросам сотрудничества
          </Typography>
          <Typography weight="demiBold" className={styles.Number}>
            +7 (926) 212 21 00
          </Typography>
        </div>
      </div>
    </div>
  );
}

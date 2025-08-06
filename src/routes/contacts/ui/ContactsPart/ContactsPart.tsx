import { useState } from 'react';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { CITIES } from '~shared/consts/cities';
import { CitySelect } from '../CitySelect';
import Telegram from '../../../../app/assets/telegram.svg?react';
import Whatsapp from '../../../../app/assets/whatsapp.svg?react';
import styles from './ContactsPart.module.css';

export function ContactsPart() {
  const [choosedCity, setChoosedCity] = useState<string>('moscow');

  return (
    <div className={styles.Content}>
      <Typography weight="medium" className={styles.Title}>
        КОНТАКТЫ
      </Typography>
      <CitySelect choosedCity={choosedCity} setChoosedCity={setChoosedCity} />
      <div className={styles.ContactsWrap}>
        <div className={styles.Column}>
          <Typography weight="demiBold" className={styles.Number}>
            {CITIES.find((city) => city.value === choosedCity)?.phone}
          </Typography>
          <div className={styles.Buttons}>
            <Button>
              <Telegram className={styles.SocialLink} />
              <span className="isTablet">Написать в&nbsp;</span>Telegram
            </Button>
            <Button>
              <Whatsapp className={styles.SocialLink} />
              <span className="isTablet">Написать в&nbsp;</span>WhatsApp
            </Button>
          </div>
        </div>
        <div className={styles.Column}>
          <Typography weight="demiBold" className={styles.Text}>
            По вопросам сотрудничества
          </Typography>
          <Typography weight="demiBold" className={styles.Number}>
            realcapoeira@gmail.com
          </Typography>
        </div>
      </div>
    </div>
  );
}

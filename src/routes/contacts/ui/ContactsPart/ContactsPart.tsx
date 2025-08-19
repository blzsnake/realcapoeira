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

  const choosedCityNumber = CITIES.find(
    (city) => city.value === choosedCity
  )?.phone;

  return (
    <div className={styles.Content}>
      <Typography weight="medium" className={styles.Title}>
        КОНТАКТЫ
      </Typography>
      <CitySelect choosedCity={choosedCity} setChoosedCity={setChoosedCity} />
      <div className={styles.ContactsWrap}>
        <div className={styles.Column}>
          <Typography weight="demiBold" className={styles.Number}>
            <a
              href={`tel:${choosedCityNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Link}
            >
              {choosedCityNumber}
            </a>
          </Typography>

          <div className={styles.Buttons}>
            <Button
              onClick={() => {
                window.open(`https://t.me/+79255550077`, '_blank');
              }}
            >
              <Telegram className={styles.SocialLink} />
              <span className={styles.Prefix}>Написать в&nbsp;</span>Telegram
            </Button>
            <Button
              onClick={() => {
                window.open(`https://wa.me/+79255550077`, '_blank');
              }}
            >
              <Whatsapp className={styles.SocialLink} />
              <span className={styles.Prefix}>Написать в&nbsp;</span>WhatsApp
            </Button>
          </div>
        </div>
        <div className={styles.Column}>
          <Typography weight="demiBold" className={styles.Text}>
            По вопросам сотрудничества
          </Typography>
          <Typography weight="demiBold" className={styles.Number}>
            <a
              href="mailto:realcapoeira@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Link}
            >
              realcapoeira@gmail.com
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
}

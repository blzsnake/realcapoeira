import { Typography } from '~shared/ui/typography';
import Baby from '../../../app/assets/Baby.svg?react';
import Kid from '../../../app/assets/Kid.svg?react';
import Teen from '../../../app/assets/Teen.svg?react';
import Adult from '../../../app/assets/Adult.svg?react';
import ArrowRight from '../../../app/assets/ArrowRight.svg?react';
import ArrowCircle from '../../../app/assets/ArrowCircle.svg?react';
import styles from './Groups.module.css';

export function Groups() {
  return (
    <div className={styles.Groups}>
      <Typography weight="demiBold" className={styles.Heading}>
        Капоэйра — спорт для всей семьи
      </Typography>
      <div className={styles.Grid}>
        <div className={styles.Card}>
          <div className={styles.InfoWrap}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 3-6 лет
            </Typography>
            <Typography className={styles.Description}>
              Базовые упражнения для развития координации и гибкости учат
              малышей слышать свое тело
            </Typography>
          </div>

          <Baby />

          {/* <img src={Baby} alt="Дети 3-6 лет" className={styles.Image} /> */}
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </div>
        <div className={styles.Card}>
          <div className={styles.InfoWrap}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 7–10 лет
            </Typography>
            <Typography className={styles.Description}>
              Упражнения помогают выпустить избыток энергии, стать сильнее и
              собраннее
            </Typography>
          </div>
          <Kid />
          {/* <img src={Kid} alt="Дети 7–10 лет" className={styles.Image} /> */}
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </div>
        <div className={styles.Card}>
          <div className={styles.InfoWrap}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 11–15 лет
            </Typography>
            <Typography className={styles.Description}>
              Ученики знакомятся с историей капоэйры и основами музыки.
              Осваивают технику ударов и акробатические элементы
            </Typography>
          </div>
          <Teen />
          {/* <img src={Teen} alt="Дети 11–15 лет" className={styles.Image} /> */}
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </div>
        <div className={styles.Card}>
          <div className={styles.InfoWrap}>
            <Typography className={styles.Title} weight="demiBold">
              Взрослые и подростки 16+
            </Typography>
            <Typography className={styles.Description}>
              Занятия глубже знакомят с культурой капоэйры и смыслом песен, а
              еще помогают стать увереннее в себе и смотреть на мир шире
            </Typography>
          </div>
          <Adult />
          {/* <img
            src={Adult}
            alt="Взрослые и подростки 16+"
            className={styles.Image}
          /> */}
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </div>
      </div>
    </div>
  );
}

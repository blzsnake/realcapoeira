import classNames from 'classnames';
import { Typography } from '~shared/ui/typography';
import BabyMobile from '../../../app/assets/BabyMobile.svg?react';
import BabyTablet from '../../../app/assets/BabyTablet.svg?react';
import BabyWeb from '../../../app/assets/BabyWeb.svg?react';
import KidMobile from '../../../app/assets/KidMobile.svg?react';
import KidTablet from '../../../app/assets/KidTablet.svg?react';
import KidWeb from '../../../app/assets/KidWeb.svg?react';
import TeenMobile from '../../../app/assets/TeenMobile.svg?react';
import TeenTablet from '../../../app/assets/TeenTablet.svg?react';
import TeenWeb from '../../../app/assets/TeenWeb.svg?react';
import AdultMobile from '../../../app/assets/AdultMobile.svg?react';
import AdultTablet from '../../../app/assets/AdultTablet.svg?react';
import AdultWeb from '../../../app/assets/AdultWeb.svg?react';
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
          <BabyMobile className={styles.Mobile} />
          <BabyTablet className={styles.Tablet} />
          <BabyWeb className={styles.Web} />
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
          <KidMobile className={styles.Mobile} />
          <KidTablet className={styles.Tablet} />
          <KidWeb className={styles.Web} />
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </div>
        <div className={styles.Card}>
          <div className={classNames(styles.InfoWrap, styles.ThirdCard)}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 11–15 лет
            </Typography>
            <Typography className={styles.Description}>
              Ученики знакомятся с историей капоэйры и основами музыки.
              Осваивают технику ударов и акробатические элементы
            </Typography>
          </div>
          <TeenMobile className={styles.Mobile} />
          <TeenTablet className={styles.Tablet} />
          <TeenWeb className={styles.Web} />
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
          <AdultMobile className={styles.Mobile} />
          <AdultTablet className={styles.Tablet} />
          <AdultWeb className={styles.Web} />
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </div>
      </div>
    </div>
  );
}

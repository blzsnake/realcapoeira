import classNames from 'classnames';
import { Typography } from '~shared/ui/typography';
import BabyWeb from '~app/assets/baby_web.png';
import KidWeb from '~app/assets/kids_web.png';
import TeenWeb from '~app/assets/teen_web.png';
import AdultWeb from '~app/assets/adult_web.png';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import ArrowCircle from '~app/assets/ArrowCircle.svg?react';
import { Link } from '@tramvai/module-router';
import styles from './Groups.module.css';

export function Groups() {
  return (
    <div className={styles.Groups}>
      <Typography weight="demiBold" className={styles.Heading}>
        Капоэйра — спорт для всей семьи
      </Typography>
      <div className={styles.Grid}>
        <Link
          viewTransition
          url="about-school/#age"
          aria-label="Филиал"
          className={styles.Card}
        >
          <div className={styles.InfoWrap}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 3-6 лет
            </Typography>
            <Typography className={styles.Description}>
              Базовые упражнения для развития координации и гибкости учат
              малышей слышать свое тело
            </Typography>
          </div>
          {/* <BabyMobile className={styles.Mobile} />
          <BabyTablet className={styles.Tablet} /> */}
          <img src={BabyWeb} alt="baby" className={styles.Image} />
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </Link>
        <Link
          viewTransition
          url="/about-school/#age"
          aria-label="Филиал"
          className={styles.Card}
        >
          <div className={styles.InfoWrap}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 7–10 лет
            </Typography>
            <Typography className={styles.Description}>
              Упражнения помогают выпустить избыток энергии, стать сильнее
              и&nbsp;собраннее
            </Typography>
          </div>
          <img src={KidWeb} alt="kid" className={styles.Image} />
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </Link>
        <Link
          viewTransition
          url="about-school/#age"
          aria-label="Филиал"
          className={styles.Card}
        >
          <div className={classNames(styles.InfoWrap, styles.ThirdCard)}>
            <Typography className={styles.Title} weight="demiBold">
              Дети 11–15 лет
            </Typography>
            <Typography className={styles.Description}>
              Ученики знакомятся с историей капоэйры и основами музыки.
              Осваивают&nbsp;технику ударов и акробатические элементы
            </Typography>
          </div>
          <img src={TeenWeb} alt="teen" className={styles.Image} />
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </Link>
        <Link
          viewTransition
          url="about-school/#age"
          aria-label="Филиал"
          className={styles.Card}
        >
          <div className={styles.InfoWrap}>
            <Typography className={styles.Title} weight="demiBold">
              Взрослые и подростки 16+
            </Typography>
            <Typography className={styles.Description}>
              Занятия глубже знакомят с культурой капоэйры и смыслом песен, а
              еще помогают стать увереннее в себе и смотреть на&nbsp;мир шире
            </Typography>
          </div>
          {/* <AdultMobile className={styles.Mobile} />
          <AdultTablet className={styles.Tablet} /> */}
          <img src={AdultWeb} alt="adult" className={styles.Image} />
          <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          <ArrowCircle width={46} height={46} className={styles.ArrowCircle} />
        </Link>
      </div>
    </div>
  );
}

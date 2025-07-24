import { Typography } from '~shared/ui/typography';
import styles from './Groups.module.css';
import Baby from '../../../app/assets/Baby.png';
import Kid from '../../../app/assets/Kid.png';
import Teen from '../../../app/assets/Teen.png';
import Adult from '../../../app/assets/Adult.png';

export function Groups() {
  return (
    <div className={styles.Groups}>
      <Typography weight="demiBold" className={styles.Heading}>
        Капоэйра — спорт для всей семьи
      </Typography>
      <div className={styles.Grid}>
        <div className={styles.Card}>
          <Typography className={styles.Title} weight="demiBold">
            Дети 3-6 лет
          </Typography>
          <Typography className={styles.Description}>
            Базовые упражнения для развития координации и гибкости учат малышей
            слышать свое тело
          </Typography>
          <img src={Baby} alt="Дети 3-6 лет" className={styles.Image} />
        </div>
        <div className={styles.Card}>
          <Typography className={styles.Title} weight="demiBold">
            Дети 7–10 лет
          </Typography>
          <Typography className={styles.Description}>
            Упражнения помогают выпустить избыток энергии, стать сильнее и
            собраннее
          </Typography>
          <img src={Kid} alt="Дети 7–10 лет" className={styles.Image} />
        </div>
        <div className={styles.Card}>
          <Typography className={styles.Title} weight="demiBold">
            Дети 11–15 лет
          </Typography>
          <Typography className={styles.Description}>
            Ученики знакомятся с историей капоэйры и основами музыки. Осваивают
            технику ударов и акробатические элементы
          </Typography>
          <img src={Teen} alt="Дети 11–15 лет" className={styles.Image} />
        </div>
        <div className={styles.Card}>
          <Typography className={styles.Title} weight="demiBold">
            Взрослые и подростки 16+
          </Typography>
          <Typography className={styles.Description}>
            Занятия глубже знакомят с культурой капоэйры и смыслом песен, а еще
            помогают стать увереннее в себе и смотреть на мир шире
          </Typography>
          <img
            src={Adult}
            alt="Взрослые и подростки 16+"
            className={styles.Image}
          />
        </div>
      </div>
    </div>
  );
}

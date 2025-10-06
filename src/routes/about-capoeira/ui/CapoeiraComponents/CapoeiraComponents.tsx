import { Typography } from '~shared/ui/typography';
import Pic1 from '~app/assets/components/Pic1.png';
import Pic2 from '~app/assets/components/Pic2.png';
import Pic3 from '~app/assets/components/Pic3.png';
import Pic4 from '~app/assets/components/Pic4.png';
import styles from './CapoeiraComponents.module.css';

export function CapoeiraComponents() {
  return (
    <div className={styles.Wrap}>
      <Typography
        component="h3"
        weight="demiBold"
        className={styles.Title}
        color="white"
      >
        Из чего состоит капоэйра
      </Typography>

      <div className={styles.ComponentsContainer}>
        <a
          href="https://vk.com/wall-269461_19569"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Component}
        >
          <div className={styles.Column}>
            <Typography weight="demiBold" className={styles.CardTitle}>
              Искусство боя
            </Typography>
            <Typography className={styles.Text}>
              Боевые приемы, удары и уходы — важнейшая часть капоэйры. Они
              развивают навыки самозащиты, координацию и ловкость
            </Typography>
          </div>
          <img src={Pic1} className={styles.Image} alt="Искусство боя" />
        </a>

        <a
          href="https://vk.com/wall-269461_19572"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Component}
        >
          <div className={styles.Column}>
            <Typography weight="demiBold" className={styles.CardTitle}>
              Акробатика
            </Typography>
            <Typography className={styles.Text}>
              Благодаря ей единоборство похоже на грациозный танец. На занятиях
              сначала обучают простым приемам, постепенно переходя к сложным
            </Typography>
          </div>
          <img src={Pic2} className={styles.Image} alt="Акробатика" />
        </a>

        <a
          href="https://vk.com/wall-269461_19571"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Component}
        >
          <div className={styles.Column}>
            <Typography weight="demiBold" className={styles.CardTitle}>
              Музыка и танец
            </Typography>
            <Typography className={styles.Text}>
              Во время занятий играют традиционную афро-бразильскую музыку. Она
              помогает войти в ритм и отдает дань истории капоэйры
            </Typography>
          </div>
          <img src={Pic3} className={styles.Image} alt="Музыка и танец" />
        </a>

        <a
          href="https://vk.com/wall-269461_19570"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Component}
        >
          <div className={styles.Column}>
            <Typography weight="demiBold" className={styles.CardTitle}>
              Рода
            </Typography>
            <Typography className={styles.Text}>
              Игра, или единоборство, происходит в кругу зрителей и музыкантов —
              ро́де. Они стоят или сидят, наблюдая за поединком
            </Typography>
          </div>
          <img src={Pic4} className={styles.Image} alt="Рода" />
        </a>
      </div>
    </div>
  );
}

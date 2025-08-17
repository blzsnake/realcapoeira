// Components
import { Typography } from '~shared/ui/typography';
// Assets
import FounderAlexander from '~app/assets/FounderAlexander.png';
import FounderTimur from '~app/assets/FounderTimur.png';
// Styles
import styles from './AboutUs.module.css';

export function AboutUs() {
  return (
    <article className={styles.Content}>
      <Typography component="h3" weight="demiBold" className={styles.Title}>
        О нас
      </Typography>
      <div className={styles.Article}>
        <div className={styles.Column}>
          <Typography>
            Школа «Реал Капоэйра» была создана в далеком 2005 году, когда об
            этом боевом искусстве знали только по фильму «Только сильнейший» и в
            России было не более десятка школ. Сейчас филиалов школы «Реал
            Капоэйра» более 30 в разных городах и странах.
          </Typography>
          <div className={styles.Years}>
            <div>
              <Typography>Год основания</Typography>
              <Typography weight="demiBold" className={styles.Year}>
                2005
              </Typography>
            </div>
            <div>
              <Typography>Филиалы</Typography>
              <Typography weight="demiBold" className={styles.Year}>
                32
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.Column}>
          <Typography>
            Основатели школы два брата Александр и Тимур Рогозины еще в 2000х
            годах начали практиковать капоэйру в Бразилии, Канаде, Европе и
            Японии. Спустя 5 лет решили связать свою жизнь с этим
            афро-бразильским боевым икусством и открыли первый филиал школы.
          </Typography>
          <div className={styles.FoundersBlock}>
            <Typography
              component="h3"
              weight="demiBold"
              className={styles.Title}
            >
              Основатели
            </Typography>
            <div className={styles.Founders}>
              <div className={styles.Founder}>
                <img
                  src={FounderAlexander}
                  className={styles.FounderIcon}
                  alt="Основатель Александр"
                />
                <div className={styles.FounderInfo}>
                  <Typography weight="demiBold">Александр Рогозин</Typography>
                  <Typography>Contra–Mestre Ninja</Typography>
                </div>
              </div>
              <div className={styles.Founder}>
                <img
                  src={FounderTimur}
                  className={styles.FounderIcon}
                  alt="Основатель Тимур"
                />
                <div className={styles.FounderInfo}>
                  <Typography weight="demiBold">Тимур Рогозин</Typography>
                  <Typography>Professor Pirulito</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

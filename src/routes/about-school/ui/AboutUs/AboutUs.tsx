// Components
import { Typography } from '~shared/ui/typography';
// Assets
import FounderAlexander from '~app/assets/FounderAlexander.png';
import FounderTimur from '~app/assets/FounderTimur.png';
import AboutUsMusicians from '~app/assets/AboutUsMusicians.png';
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

        <div className={styles.Column}>
          <Typography>
            Сегодня в школе более 20 инструкторов, все они выросли из учеников и
            продолжают совершенствовать свои навыки капоэйры, преподавания,
            музыки и танца. Каждый инструктор прошёл аттестацию в международной
            ассоциации капоэйры Cordao de Ouro, чтобы передавать знания о
            традиционной капоэйре взрослым и детям безопасно и эффективно.
          </Typography>
          <Typography>
            Для преподавателей школы «Реал Капоэйра» искусство капоэйры стало не
            только увлечением, но и стилем жизни. На занятиях вы будете не
            просто изучать движения и прыжки, вы откроете для себя удивительный
            язык тела, с помощью которого сможете создавать уникальные диалоги с
            партнёром через неповторимый танец-битву.
          </Typography>
        </div>

        <img src={AboutUsMusicians} className={styles.Image} alt="Музыканты" />
      </div>
    </article>
  );
}

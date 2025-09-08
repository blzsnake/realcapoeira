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
            Основатели школы — Александр и Тимур Рогозины. В 2000-х братья
            начали практиковать капоэйру в Бразилии, Канаде, Европе и Японии.
            Тогда капоэйра считалась нишевым спортом, и в России была всего пара
            школ. Об этом боевом искусстве знали в основном благодаря фильму
            «Только сильнейшие» 1993 года.
          </Typography>
          <Typography>
            В 2007 году братья открыли школу Real Capoeira с собственной
            системой обучения в Москве. Сейчас у школы несколько десятков
            филиалов в разных городах и странах.
          </Typography>
          <div className={styles.Years}>
            <div>
              <Typography>Год основания</Typography>
              <Typography weight="demiBold" className={styles.Year}>
                2007
              </Typography>
            </div>
            <div>
              <Typography>Филиалы</Typography>
              <Typography weight="demiBold" className={styles.Year}>
                45
              </Typography>
            </div>
          </div>
        </div>

        <div className={styles.Column}>
          <Typography>
            Независимо от локации, в школе царит энергия и дух традиционной
            капоэйры, а безопасность и комфорт учеников — наш приоритет.
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
                  <Typography>Contra-Mestre Pirulito</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.Column}>
          <Typography>
            Сегодня в школе более 20 тренеров — все они когда-то были нашими
            учениками. Они продолжают совершенствовать свои навыки капоэйры,
            преподавания, музыки и танца. Каждый тренер прошел аттестацию в
            международной ассоциации капоэйры Cordão de Ouro, чтобы безопасно и
            эффективно обучать детей и взрослых.
          </Typography>
          <Typography>
            Для наших преподавателей искусство капоэйры — не только увлечение,
            но и стиль жизни. На занятиях вы не просто изучаете движения и
            удары, но и учитесь взаимодействовать со своим телом, а также
            общаться с партнером через неповторимый танец-битву.
          </Typography>
        </div>

        <img src={AboutUsMusicians} className={styles.Image} alt="Музыканты" />
      </div>
    </article>
  );
}

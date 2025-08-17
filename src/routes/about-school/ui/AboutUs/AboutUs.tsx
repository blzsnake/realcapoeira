import { Typography } from '~shared/ui/typography';
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
      </div>
    </article>
  );
}

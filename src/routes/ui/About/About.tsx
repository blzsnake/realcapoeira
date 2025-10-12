import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import Alexander from '~app/assets/Alexandr.png';
import styles from './About.module.css';

export function About() {
  return (
    <article className={styles.About}>
      <div className={styles.Column}>
        <Typography weight="medium" className={styles.Heading}>
          «Капоэйра — одно из самых красивых и загадочных боевых искусств в
          мире»
        </Typography>
        <div className={styles.Author}>
          <img src={Alexander} alt="Alexander" className={styles.Image} />
          <div className={styles.AuthorColumn}>
            <Typography className={styles.AuthorName} weight="demiBold">
              Александр Рогозин
            </Typography>
            <Typography className={styles.AuthorInfo}>
              Основатель школы Real Capoeira, обладатель титула Contra–Mestre
              Ninja
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.Column}>
        <Typography className={styles.CapoeiraInfo}>
          Бразильская капоэйра — это сочетания боя, танца и акробатики.
          Капоэйристы состязаются под живую музыку, учатся импровизировать и
          чувствовать ритм. Рассказываем, почему капоэйра — это история о
          свободе.
        </Typography>
        {/* Разлочить когда будет страница */}
        {/* <Button className={styles.Button}>
          <Typography
            className={styles.ButtonText}
            weight="medium"
            color="white"
          >
            Узнать больше
          </Typography>
        </Button> */}
      </div>
    </article>
  );
}

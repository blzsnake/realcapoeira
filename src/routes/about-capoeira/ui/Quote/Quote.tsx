import { Typography } from '~shared/ui/typography';
import Alexander from '~app/assets/Alexandr.png';
import styles from './Quote.module.css';

export function Quote() {
  return (
    <div className={styles.Wrap}>
      <div className={styles.Content}>
        <Typography color="white" className={styles.Quote}>
          Капоэйра — это не просто бой, это танец, в котором высвобождается
          внутренняя энергия. Мы помогаем управлять ей с пользой и радостью
        </Typography>
        <div className={styles.Column}>
          <img src={Alexander} className={styles.Image} alt="Александр" />
          <Typography color="white" weight="demiBold" className={styles.Name}>
            Александр Рогозин
          </Typography>
          <Typography color="white" className={styles.Subtitle}>
            Основатель школы «Real Capoeira»
          </Typography>
        </div>
      </div>
    </div>
  );
}

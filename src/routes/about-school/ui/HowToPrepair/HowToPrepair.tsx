// Components
import { Typography } from '~shared/ui/typography';
// Assets
import { CollapsibleRow } from '../CollapsibleRow';
// Styles
import styles from './HowToPrepair.module.css';

export function HowToPrepair() {
  return (
    <article className={styles.Content}>
      <Typography component="h3" weight="demiBold" className={styles.Title}>
        Как подготовиться к&nbsp;занятию
      </Typography>
      <div className={styles.Article}>
        <CollapsibleRow title="Если вы первый раз">
          <div className={styles.CollapsibleContent}>
            <Typography>
              Запишитесь или позвоните предупредите тренера, что придёте.
            </Typography>
          </div>
        </CollapsibleRow>
        <CollapsibleRow title="Что нужно взять на тренировку">
          <div className={styles.CollapsibleContent}>
            <Typography>
              Возьмите удобные тренировочные штаны и футболку. Занятия проходят
              босиком, но можете взять носки. Так же возьмите тапочки или
              шлёпанцы, чтобы дойти из раздевалки до зала. И не забудьте бутылку
              чистой питьевой воды.
            </Typography>
            <Typography>
              Так же в раздевалке есть душ, так что можете захватить полотенце и
              средства личной гигиены.
            </Typography>
          </div>
        </CollapsibleRow>
        <CollapsibleRow title="Для дошкольников и начальных классов">
          <div className={styles.CollapsibleContent}>
            <Typography>
              Возьмите носочки белого и черного цвета, чтобы левый и правый
              носок отличались. Так мы будем тренировать упражнения на левую и
              правую сторону.
            </Typography>
          </div>
        </CollapsibleRow>
        <CollapsibleRow title="Ко скольки лучше всего прийти">
          <div className={styles.CollapsibleContent}>
            <Typography>
              Приходите за 10–15 минут до занятия, так же рекомендуем не есть за
              час-полтора, чтобы занятие прошло легко.
            </Typography>
          </div>
        </CollapsibleRow>
      </div>
    </article>
  );
}

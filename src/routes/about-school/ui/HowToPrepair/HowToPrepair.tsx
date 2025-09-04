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
        Подготовка к занятию
      </Typography>
      <div className={styles.Article}>
        <CollapsibleRow title="Если вы первый раз">
          <div className={styles.CollapsibleContent}>
            <Typography>
              Не волнуйтесь — наши тренеры умеют работать с новичками и к
              каждому ищут индивидуальный подход. Позвоните, чтобы записаться на
              занятие и получить ответы на любые вопросы
            </Typography>
          </div>
        </CollapsibleRow>
        <CollapsibleRow title="Что взять на тренировку">
          <div className={styles.CollapsibleContentList}>
            <Typography> Советуем всегда иметь при себе:</Typography>
            <ul>
              <li>
                <Typography>Удобные спортивные штаны и футболку</Typography>
              </li>
              <li>
                <Typography>
                  Носки, если не хотите заниматься босиком
                </Typography>
              </li>
              <li>
                <Typography>Тапочки для раздевалки и душа</Typography>
              </li>
              <li>
                <Typography>Полотенце и средства личной гигиены</Typography>
              </li>
              <li>
                <Typography>Питьевую воду</Typography>
              </li>
            </ul>
          </div>
        </CollapsibleRow>
        <CollapsibleRow title="Рекомендация для родителей">
          <div className={styles.CollapsibleContent}>
            <Typography>
              Малышам 3—10 лет советуем надевать носочки белого и черного цвета
              так, чтобы левый и правый носок отличались. Так им будет легче
              выполнять упражнения на левую и правую ногу
            </Typography>
          </div>
        </CollapsibleRow>
        <CollapsibleRow title="Когда лучше прийти на занятие">
          <div className={styles.CollapsibleContent}>
            <Typography>
              Приходите за 10–15 минут до тренировки, чтобы успеть переодеться и
              подготовиться. Также рекомендуем не есть за 1—1,5 часа, чтобы
              занятие прошло легко
            </Typography>
          </div>
        </CollapsibleRow>
      </div>
    </article>
  );
}

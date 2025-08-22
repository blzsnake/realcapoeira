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
        Занятия для всех возрастов
      </Typography>
      <div className={styles.Article}>
        <CollapsibleRow title="Взрослые от 18 лет и старше">
          <div className={styles.CollapsibleContent}>
            <Typography>Заглушка</Typography>
          </div>
        </CollapsibleRow>
      </div>
    </article>
  );
}

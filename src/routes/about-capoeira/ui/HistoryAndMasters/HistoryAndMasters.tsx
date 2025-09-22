import AboutCapoeiraFlag from '~app/assets/AboutCapoeiraFlag.png';
import AboutCapoeiraMap from '~app/assets/AboutCapoeiraMap.png';
import { History } from './ui/History';
import { Masters } from './ui/Masters';
import styles from './HistoryAndMasters.module.css';

export function HistoryAndMasters() {
  return (
    <div className={styles.Wrap} id="#headerScrollMarker">
      <img src={AboutCapoeiraFlag} className={styles.Flag} alt="Флаг" />
      <img src={AboutCapoeiraMap} className={styles.Map} alt="Карта" />
      <div className={styles.Content}>
        <History />
        <Masters />
      </div>
    </div>
  );
}

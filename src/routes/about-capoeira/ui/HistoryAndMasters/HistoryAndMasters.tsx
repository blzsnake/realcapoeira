import AboutCapoeiraFlag from '~app/assets/AboutCapoeiraFlag.svg';
import AboutCapoeiraMap from '~app/assets/AboutCapoeiraMap.svg';
import styles from './HistoryAndMasters.module.css';

export function HistoryAndMasters() {
  return (
    <div className={styles.Wrap} id="#headerScrollMarker">
      <img src={AboutCapoeiraFlag} className={styles.Flag} alt="Флаг" />
      <img src={AboutCapoeiraMap} className={styles.Map} alt="Карта" />
      <div className={styles.Content}>
        <p>history</p>
        <p>masters</p>
      </div>
    </div>
  );
}

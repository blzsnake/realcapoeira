import styles from './SchoolPhoto.module.css';
import AllCrew from '../../../app/assets/AllCrew.png';

export function SchoolPhoto() {
  return (
    <div className={styles.SchoolPhoto}>
      <h1 className={styles.Heading}>
        ШКОЛА
        <br />
        REAL CAPOEIRA
      </h1>
      <img src={AllCrew} className={styles.Image} alt="Команда" />
    </div>
  );
}

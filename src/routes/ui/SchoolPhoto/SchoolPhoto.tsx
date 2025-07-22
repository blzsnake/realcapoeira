import { Button } from '~shared/button/Button';
import styles from './SchoolPhoto.module.css';
import AllCrew from '../../../app/assets/AllCrew.png';

export function SchoolPhoto() {
  return (
    <div className={styles.SchoolPhoto}>
      <div className={styles.HeadingBlock}>
        <h1 className={styles.Heading}>
          ШКОЛА
          <br />
          REAL CAPOEIRA
        </h1>
        <div className={styles.ButtonsBlockMobile}>
          <Button className={styles.Button}>О школе</Button>
          <Button color="white" className={styles.Button}>
            Филиалы
          </Button>
        </div>
      </div>
      <img src={AllCrew} className={styles.Image} alt="Команда" />
      <div className={styles.ButtonsBlockWeb}>
        <Button className={styles.Button}>О школе</Button>
        <Button color="white" className={styles.Button}>
          Филиалы
        </Button>
      </div>
    </div>
  );
}

import { Button } from '~shared/ui/button/Button';
import styles from './SchoolPhoto.module.css';
import AllCrew from '../../../app/assets/AllCrew.png';
import ArrowDown from '../../../app/assets/ArrowDown.svg?react';

export function SchoolPhoto({ scrollHandler }: { scrollHandler: () => void }) {
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
        <ArrowDown width={46} height={46} onClick={scrollHandler} />
        <Button color="white" className={styles.Button}>
          Филиалы
        </Button>
      </div>
    </div>
  );
}

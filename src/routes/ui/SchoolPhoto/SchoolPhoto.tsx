import { Link } from '@tramvai/module-router';
import { Button } from '~shared/ui/button/Button';
import AllCrew from '~app/assets/AllCrew.png';
import ArrowDown from '~app/assets/ArrowDown.svg?react';
import styles from './SchoolPhoto.module.css';

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
          <Link viewTransition url="/about-school/" aria-label="О школе">
            <Button className={styles.Button}>О школе</Button>
          </Link>
          <Link viewTransition url="/filials/" aria-label="Филиалы">
            <Button color="white" className={styles.Button}>
              Филиалы
            </Button>
          </Link>
        </div>
      </div>
      <img src={AllCrew} className={styles.Image} alt="Команда" />
      <div className={styles.ButtonsBlockWeb}>
        <Link viewTransition url="/about-school/" aria-label="О школе">
          <Button className={styles.Button}>О школе</Button>
        </Link>
        <ArrowDown width={46} height={46} onClick={scrollHandler} />
        <Link viewTransition url="/filials/" aria-label="Филиалы">
          <Button color="white" className={styles.Button}>
            Филиалы
          </Button>
        </Link>
      </div>
    </div>
  );
}

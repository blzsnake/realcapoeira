import { Link } from '@tramvai/module-router';
import { Button } from '~shared/ui/button/Button';
import AllCrew from '~app/assets/AllCrew.png';
import ArrowDown from '~app/assets/ArrowDown.svg?react';
import styles from './SchoolPhoto.module.css';

export function SchoolPhoto({ scrollHandler }: { scrollHandler: () => void }) {
  const handleScrollToForm = () => {
    const elem = document.getElementById('signup');

    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.SchoolPhoto} id="#headerScrollMarker">
      <div className={styles.HeadingBlock}>
        <h1 className={styles.Heading}>
          ШКОЛА
          <br />
          REAL CAPOEIRA
        </h1>
        <div className={styles.ButtonsBlockMobile}>
          <Button className={styles.Button} url="/about-school/">
            О школе
          </Button>
          <Button url="/filials/" color="white" className={styles.Button}>
            Филиалы
          </Button>
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

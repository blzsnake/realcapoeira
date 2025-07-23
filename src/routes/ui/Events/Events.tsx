import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import styles from './Events.module.css';

function ButtonsBlock() {
  return (
    <div className={styles.ButtonsBlock}>
      <Button color="yellow" className={styles.Button}>
        Все новости в Telegram
      </Button>
      <Button>VK</Button>
    </div>
  );
}

export function Events() {
  return (
    <div className={styles.Events}>
      <div className={styles.HeadingBlock}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          События
        </Typography>
      </div>
      <p>слайдер</p>
      <ButtonsBlock />
    </div>
  );
}

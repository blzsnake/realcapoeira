import EmptyFilter from '~app/assets/empty_filter.png';
import { Button } from '~shared/ui/button/Button';
import { Typography } from '~shared/ui/typography';
import styles from './EmptyCard.module.css';

export function EmptyCard() {
  return (
    <div className={styles.EmptyCard}>
      <img className={styles.Image} src={EmptyFilter} alt="Ничего не найдено" />
      <Typography weight="demiBold" className={styles.Title}>
        Упс — филиалы не найдены
      </Typography>
      <Typography className={styles.Description}>
        Попробуйте сбросить фильтры или выбрать другую локацию
      </Typography>
      <Button
        size="big"
        color="yellow"
        className={styles.Button}
        onClick={() => {
          window.history.pushState({}, '', '/filials/');
        }}
      >
        Найти школу поблизости
      </Button>
    </div>
  );
}

import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { EventCard } from '~shared/ui/EventCard/EventCard';
import styles from './Events.module.css';

const mockProps = {
  dateFrom: '2025-09-26',
  dateTo: '2025-09-28',
  onClick: () => {
    console.log('Event clicked');
  },
  title: 'Семинар от бразильских мастеров',
  description:
    'Berimbau me chama — это 3 дня мастер-классов для взрослых и детей',
};

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
      <EventCard {...mockProps} />
      <ButtonsBlock />
    </div>
  );
}

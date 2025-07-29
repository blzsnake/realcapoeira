import { useState } from 'react';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { EventCard } from '~shared/ui/EventCard/EventCard';
import styles from './Events.module.css';
import { EventModal } from './modals/EventModal/EventModal';

const mockProps = {
  dateFrom: '2025-09-26',
  dateTo: '2025-09-28',
  onClick: () => {
    console.log('Event clicked');
  },
  title: 'Семинар от бразильских мастеров',
  description:
    'Berimbau me chama — это 3 дня мастер‑классов для взрослых и детей',
};

const mockEvents = Array(4).fill(mockProps);

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
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <div className={styles.Events}>
        <div className={styles.HeadingBlock}>
          <Typography
            component="h2"
            weight="demiBold"
            className={styles.Heading}
          >
            События
          </Typography>
          <ButtonsBlock />
        </div>

        <div className={styles.Cards}>
          {mockEvents.map((evt) => (
            <EventCard key={evt.title} {...evt} />
          ))}
        </div>

        <div className={styles.BottomButtons}>
          <ButtonsBlock />
        </div>
      </div>
      <EventModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
}

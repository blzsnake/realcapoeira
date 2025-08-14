import { useState } from 'react';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { EventCard } from '~shared/ui/EventCard/EventCard';
import { News1 } from './ui/LatestNews/LatestNews';
import { EventModal } from './modals/EventModal/EventModal';
import type { EventModalProps } from './modals/EventModal/types';
import styles from './Events.module.css';

const mockProps = {
  dateFrom: '2025-09-26',
  dateTo: '2025-09-28',
  title: 'Семинар от бразильских мастеров',
  description:
    'Berimbau me chama — это 3 дня мастер‑классов для взрослых и детей',
};

const mockEvents = Array(4).fill(mockProps);

function ButtonsBlock() {
  return (
    <div className={styles.ButtonsBlock}>
      <Button
        color="yellow"
        className={styles.Button}
        onClick={() => window.open('https://t.me/real_capoeira', '_blank')}
      >
        Все новости в Telegram
      </Button>
      <Button
        onClick={() => window.open('https://vk.com/realcapoeira', '_blank')}
      >
        VK
      </Button>
    </div>
  );
}

export function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockModalProps: EventModalProps = {
    isOpen: isModalOpen,
    closeModal: () => setIsModalOpen(false),
    title: 'Батизада 2024 для дошкольников 3-6 лет',
    date: '2023-04-12T12:00:00.000Z',
    children: <News1 />,
  };

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
            <EventCard
              onClick={() => setIsModalOpen(true)}
              key={evt.title}
              {...evt}
            />
          ))}
        </div>

        <div className={styles.BottomButtons}>
          <ButtonsBlock />
        </div>
      </div>
      <EventModal {...mockModalProps} />
    </>
  );
}

import { useState } from 'react';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { EventCard } from '~shared/ui/EventCard/EventCard';
import { News1, News2, News3, News4 } from './ui/LatestNews/LatestNews';
import { EventModal } from './modals/EventModal/EventModal';
import type { EventModalProps } from './modals/EventModal/types';
import styles from './Events.module.css';

function ButtonsBlock() {
  return (
    <div className={styles.ButtonsBlock}>
      <Button
        color="yellow"
        url="https://t.me/real_capoeira"
        className={styles.Button}
      >
        Все новости в Telegram
      </Button>
      <Button url="https://vk.com/realcapoeira">VK</Button>
    </div>
  );
}

type CardInfo = Omit<EventModalProps, 'isOpen' | 'closeModal'> & {
  cardTitle: string;
  description: string;
};

export function Events() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isModalOpen = activeIndex !== null;
  const closeModal = () => setActiveIndex(null);

  const cardInfos: CardInfo[] = [
    {
      cardTitle: 'Идет набор в группы',
      fullTitle: 'Идет набор в группы по капоэйре',
      description:
        'Попробуйте капоэйру — поможем стать сильнее, гибче и выносливее. Будем рады и детям, и взрослым',
      children: <News1 />,
    },
    {
      cardTitle: 'Спортивные сборы 7+',
      fullTitle: 'Спортивные сборы для школьников',
      description:
        'Ежедневные тренировки и игры на свежем воздухе для школьников',
      children: <News2 />,
    },
    {
      cardTitle: 'Спортивные сборы 16+',
      fullTitle: 'Спортивные сборы для взрослых',
      description:
        'Приглашаем в лагерь для взрослых — с мастер-классами от бразильских мастеров и танцами',
      children: <News3 />,
    },
    {
      cardTitle: 'Экосистема Real Capoeira',
      fullTitle: 'Станьте частью сообщества',
      description:
        'Следите за нами в удобной соцсети. Чтобы не пропустить новости школы, подпишитесь на чат-бот в Telegram',
      children: <News4 />,
    },
  ];

  const active = activeIndex !== null ? cardInfos[activeIndex] : null;

  return (
    <div className={styles.Events}>
      <div className={styles.HeadingBlock}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          События
        </Typography>
        <ButtonsBlock />
      </div>

      <div className={styles.Cards}>
        <div className={styles.EmptyPlug} />
        {cardInfos.map((evt, i) => (
          <EventCard
            key={evt.cardTitle}
            onClick={() => setActiveIndex(i)}
            title={evt.cardTitle}
            description={evt.description}
          />
        ))}
        <div className={styles.EmptyPlug} />
      </div>

      <div className={styles.BottomButtons}>
        <ButtonsBlock />
      </div>

      {active && (
        <EventModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          fullTitle={active.fullTitle}
        >
          {active.children}
        </EventModal>
      )}
    </div>
  );
}

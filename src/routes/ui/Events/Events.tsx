import { useEffect, useState } from 'react';
import {
  getCachedHomeNewsSection,
  getFallbackHomeNewsSection,
  loadHomeNewsSectionWithFallback,
  type HomeNewsSection,
} from '~shared/content/news';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { EventCard } from '~shared/ui/EventCard/EventCard';
import { CmsNewsContent } from './ui/LatestNews/LatestNews';
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
  id: string;
  cardTitle: string;
  description: string;
};

export function Events() {
  const [homeNewsSection, setHomeNewsSection] = useState<HomeNewsSection>(
    getCachedHomeNewsSection() ?? getFallbackHomeNewsSection()
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isModalOpen = activeIndex !== null;
  const closeModal = () => setActiveIndex(null);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        const nextHomeNewsSection = await loadHomeNewsSectionWithFallback();

        if (!isMounted) {
          return;
        }

        setHomeNewsSection(nextHomeNewsSection);
      } catch {
        // Keep fallback content if the client request fails.
      }
    };

    loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const cardInfos: CardInfo[] = homeNewsSection.items.map((item) => {
    return {
      id: item.id,
      cardTitle: item.shortTitle,
      fullTitle: item.title,
      description: item.shortDescription,
      children: <CmsNewsContent item={item} />,
    };
  });

  const active = activeIndex !== null ? cardInfos[activeIndex] : null;

  return (
    <div className={styles.Events}>
      <div className={styles.HeadingBlock}>
        <Typography component="h2" weight="demiBold" className={styles.Heading}>
          {homeNewsSection.title}
        </Typography>
        <ButtonsBlock />
      </div>
      {homeNewsSection.description ? (
        <Typography className={styles.Description}>
          {homeNewsSection.description}
        </Typography>
      ) : null}

      <div className={styles.Cards}>
        <div className={styles.EmptyPlug} />
        {cardInfos.map((evt, i) => (
          <EventCard
            key={evt.id}
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

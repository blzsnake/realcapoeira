import { useRef, useState } from 'react';
import { Typography } from '~shared/ui/typography';
import RightArrow from '~app/assets/right_arrow.svg?react';
import LeftArrow from '~app/assets/left_arrow.svg?react';
import Master1 from '~app/assets/masters/1.png';
import Master2 from '~app/assets/masters/2.png';
import Master3 from '~app/assets/masters/3.png';
import Master4 from '~app/assets/masters/4.png';
import Master5 from '~app/assets/masters/5.png';
import Master6 from '~app/assets/masters/6.png';
import Master7 from '~app/assets/masters/7.png';
import Master8 from '~app/assets/masters/8.png';
import { MasterCard } from './MasterCard';
import { MasterModal } from './modals/MasterModal';
import {
  MasterData1,
  MasterData2,
  MasterData3,
  MasterData4,
  MasterData5,
  MasterData6,
  MasterData7,
  MasterData8,
} from './ui/MastersData';
import styles from './Masters.module.css';

const mastersData = [
  {
    name: 'Mestre Bimba',
    dates: '23 ноября 1899 — 5 февраля 1974',
    children: <MasterData1 />,
  },
  {
    name: 'Mestre Pastinha',
    dates: '5 апреля 1889 — 13 ноября 1981',
    children: <MasterData2 />,
  },
  {
    name: 'Mestre Suassuna',
    dates: '3 июля 1938 — по сей день',
    children: <MasterData3 />,
  },
  {
    name: 'Mestre Acordeon',
    dates: '1943 — по сей день',
    children: <MasterData4 />,
  },
  {
    name: 'Mestre João Grande',
    dates: '15 января 1933 — по сей день',
    children: <MasterData5 />,
  },
  {
    name: 'Mestre Camisa',
    dates: '28 октября 1955 — по сей день',
    children: <MasterData6 />,
  },
  {
    name: 'Mestre Cobra Mansa',
    dates: '19 мая 1960 — по сей день',
    children: <MasterData7 />,
  },
  {
    name: 'Mestre João Pequeno',
    dates: '27 декабря 1917 — 9 декабря 2011',
    children: <MasterData8 />,
  },
];

export function Masters() {
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const refMasters = useRef<HTMLDivElement>(null);
  const handleClickToScroll = (data: number) => () =>
    refMasters?.current?.scrollBy({
      left: data,
      behavior: 'smooth',
    });

  return (
    <article className={styles.Masters}>
      <div className={styles.HeadingRow}>
        <Typography
          component="h3"
          weight="demiBold"
          className={styles.Title}
          color="white"
        >
          Великие мастера
        </Typography>
        <div className={styles.Arrows}>
          <LeftArrow
            onClick={handleClickToScroll(-400)}
            width={46}
            height={46}
            className={styles.Arrow}
          />
          <RightArrow
            onClick={handleClickToScroll(400)}
            width={46}
            height={46}
            className={styles.Arrow}
          />
        </div>
      </div>
      <div ref={refMasters} className={styles.Slider} id="#masters">
        <MasterCard
          image={Master1}
          title="Mestre Bimba"
          subtitle="Мануэль дос Рейш Машаду"
          onClick={() => setIsModalOpen(0)}
        />
        <MasterCard
          image={Master2}
          title="Mestre Pastinha"
          subtitle="Висенте Феррейра Пастинья"
          onClick={() => setIsModalOpen(1)}
        />
        <MasterCard
          image={Master3}
          title="Mestre Suassuna"
          subtitle="Рейнальду Рамус Суазуна"
          onClick={() => setIsModalOpen(2)}
        />
        <MasterCard
          image={Master4}
          title="Mestre Acordeon"
          subtitle="Бира Алмейда"
          onClick={() => setIsModalOpen(3)}
        />
        <MasterCard
          image={Master5}
          title="Mestre João Grande"
          subtitle="Жоао Оливейра дос Сантуш"
          onClick={() => setIsModalOpen(4)}
        />
        <MasterCard
          image={Master6}
          title="Mestre Camisa"
          subtitle="Жозе Тадеу Карнейру Кардозу"
          onClick={() => setIsModalOpen(5)}
        />
        <MasterCard
          image={Master7}
          title="Mestre Cobra Mansa"
          subtitle="Синезио Фелисиану Пеcанья"
          onClick={() => setIsModalOpen(6)}
        />
        <MasterCard
          image={Master8}
          title="Mestre João Pequeno"
          subtitle="Жоау Перейра дос Сантуш"
          onClick={() => setIsModalOpen(7)}
        />
        <div className={styles.EmptyPlug} />
      </div>
      {isModalOpen !== null && (
        <MasterModal
          isOpen={isModalOpen !== null}
          closeModal={() => setIsModalOpen(null)}
          name={mastersData[isModalOpen].name}
          dates={mastersData[isModalOpen].dates}
        >
          {mastersData[isModalOpen].children}
        </MasterModal>
      )}
    </article>
  );
}

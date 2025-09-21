import { useRef } from 'react';
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
import styles from './Masters.module.css';

export function Masters() {
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
          subtitle="Мануэль дус Рейс Машаду"
        />
        <MasterCard
          image={Master2}
          title="Mestre Pastinha"
          subtitle="Висенте Феррейра Пастинья"
        />
        <MasterCard
          image={Master3}
          title="Mestre Suassuna"
          subtitle="Рейнальдо Рамос Суассуна"
        />
        <MasterCard
          image={Master4}
          title="Mestre Acordeon"
          subtitle="Бира Алмеида"
        />
        <MasterCard
          image={Master5}
          title="João Grande"
          subtitle="Жоао Оливейра душ Сантуш"
        />
        <MasterCard
          image={Master6}
          title="Mestre Camisa"
          subtitle="Хосе Тадеу Карнейро Кардосо"
        />
        <MasterCard
          image={Master7}
          title="Mestre Cobra Mansa"
          subtitle="Синéзиу Фелисиáну Пеcáнья"
        />
        <MasterCard
          image={Master8}
          title="Mestre Joao Pequeno"
          subtitle="Жоау Перейра душ Сантуш"
        />
        <div className={styles.EmptyPlug} />
      </div>
    </article>
  );
}

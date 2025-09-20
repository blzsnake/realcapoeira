import { useRef } from 'react';
import { Typography } from '~shared/ui/typography';
import RightArrow from '~app/assets/right_arrow.svg?react';
import LeftArrow from '~app/assets/left_arrow.svg?react';
import Moscow from '~app/assets/moscow.png';
import { MasterCard } from './MasterCard/MasterCard';
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
          image={Moscow}
          title="Мастер 1"
          subtitle="Описание мастера 1"
        />
      </div>
    </article>
  );
}

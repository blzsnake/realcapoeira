import { Typography } from '~shared/ui/typography';
import { CityCard } from '~shared/ui/CityCard/CityCard';
import RightArrow from '~app/assets/right_arrow.svg?react';
import LeftArrow from '~app/assets/left_arrow.svg?react';
import { Button } from '~shared/ui/button/Button';
import Moscow from '~app/assets/moscow.png';
import Kaz from '~app/assets/kaz.png';
import Krs from '~app/assets/krs.png';
import Lissabon from '~app/assets/lis.png';
import Eu from '~app/assets/eu.png';
import Us from '~app/assets/us.png';
import Asia from '~app/assets/asia.png';
import Usa from '~app/assets/usa.png';

import { useRef } from 'react';
import styles from './Worldwide.module.css';

export function Worldwide() {
  const refCountries = useRef<HTMLDivElement>(null);
  const handleClickToScroll = (data: number) => () =>
    refCountries?.current?.scrollBy({
      left: data,
      behavior: 'smooth',
    });

  return (
    <div className={styles.Worldwide}>
      <Typography weight="demiBold" className={styles.Heading} component="h2">
        Занимайтесь где удобно
      </Typography>
      <Typography className={styles.Subheading}>
        В филиалах Real Capoeira и у наших друзей по всему миру
      </Typography>
      <Button
        url="/filials/"
        color="yellow"
        size="big"
        className={styles.Button}
      >
        К списку школ
      </Button>
      <div className={styles.Wrap}>
        <div ref={refCountries} className={styles.Countries} id="#countries">
          <LeftArrow
            onClick={handleClickToScroll(-400)}
            width={46}
            height={46}
            className={styles.ArrowLeftIcon}
          />
          <RightArrow
            onClick={handleClickToScroll(400)}
            width={46}
            height={46}
            className={styles.ArrowRightIcon}
          />
          <div className={styles.EmptyPlug} />
          <CityCard
            title="Москва"
            subtitle="Россия"
            url="/filials/?city=moscow"
            image={Moscow}
          />
          <CityCard
            title="Казань"
            subtitle="Россия"
            url="/filials/?city=kazan"
            image={Kaz}
          />
          <CityCard
            title="Краснодар"
            subtitle="Россия"
            url="/filials/?city=krasnodar"
            image={Krs}
          />
          <CityCard
            title="Лиссабон"
            subtitle="Португалия"
            url="/filials/?city=lissabon"
            image={Lissabon}
          />
          <CityCard
            title="Европа"
            subtitle="Друзья школы"
            url="/filials/?city=europe"
            image={Eu}
          />
          <CityCard
            title="Латинская америка"
            subtitle="Друзья школы"
            url="/"
            image={Us}
          />
          <CityCard
            title="Азия"
            subtitle="Друзья школы"
            url="/filials/?city=asia"
            image={Asia}
          />
          <CityCard
            title="Северная америка"
            subtitle="Друзья школы"
            url="/filials/?city=america"
            image={Usa}
          />
          <div className={styles.EmptyPlug} />
        </div>
      </div>
    </div>
  );
}

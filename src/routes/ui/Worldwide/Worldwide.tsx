import { Typography } from '~shared/ui/typography';
import { CityCard } from '~shared/ui/CityCard/CityCard';
import { Button } from '~shared/ui/button/Button';
import Moscow from '~app/assets/moscow.png';
import Kaz from '~app/assets/kaz.png';
import Krs from '~app/assets/krs.png';
import Lissabon from '~app/assets/lis.png';
import Eu from '~app/assets/eu.png';
import Us from '~app/assets/us.png';
import Asia from '~app/assets/asia.png';
import Usa from '~app/assets/usa.png';

import styles from './Worldwide.module.css';

export function Worldwide() {
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
      <div className={styles.Countries}>
        <div className={styles.EmptyPlug} />
        <CityCard title="Москва" subtitle="Россия" url="/" image={Moscow} />
        <CityCard title="Казань" subtitle="Россия" url="/" image={Kaz} />
        <CityCard title="Краснодар" subtitle="Россия" url="/" image={Krs} />
        <CityCard
          title="Лиссабон"
          subtitle="Друзья школы"
          url="/"
          image={Lissabon}
        />
        <CityCard title="Европа" subtitle="Друзья школы" url="/" image={Eu} />
        <CityCard
          title="Латинская америка"
          subtitle="Друзья школы"
          url="/"
          image={Us}
        />
        <CityCard title="Азия" subtitle="Друзья школы" url="/" image={Asia} />
        <CityCard
          title="Северная америка"
          subtitle="Друзья школы"
          url="/"
          image={Usa}
        />
        <div className={styles.EmptyPlug} />
      </div>
    </div>
  );
}

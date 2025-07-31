import { Typography } from '~shared/ui/typography';
import { CityCard } from '~shared/ui/CityCard/CityCard';
import Moscow from '~app/assets/moscow.png';

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
      <div className={styles.Countries}>
        <CityCard url="/" image={Moscow} />
        <CityCard title="Казань" subtitle="Россия" url="/" image="/" />
        <CityCard title="Краснодар" subtitle="Россия" url="/" image="/" />
        <CityCard title="Лиссабон" subtitle="Россия" url="/" image="/" />
      </div>
    </div>
  );
}

import type { TCity } from '~shared/consts/cities';
import { CITIES } from '~shared/consts/cities';
import classNames from 'classnames';
import { Typography } from '~shared/ui/typography';
import styles from './CitySelect.module.css';

export function CitySelect({
  choosedCity,
  setChoosedCity,
}: {
  choosedCity: TCity;
  setChoosedCity: (city: TCity) => void;
}) {
  return (
    <div className={styles.WebWrap}>
      {CITIES.map((city) => (
        <Typography
          key={city.value}
          weight={city.value === choosedCity ? 'demiBold' : 'regular'}
          className={classNames(styles.Title, {
            [styles.Choosed]: city.value === choosedCity,
          })}
          onClick={() => setChoosedCity(city.value)}
        >
          {city.name}
        </Typography>
      ))}
      {/* Тут будет модалка для мобилки */}
    </div>
  );
}

import classNames from 'classnames';
import { Typography } from '~shared/ui/typography';
import { MobileSelector } from '~shared/ui/MobileSelector';
import { CITIES } from '~shared/consts/cities';
import styles from './CitySelect.module.css';

export function CitySelect({
  choosedCity,
  setChoosedCity,
}: {
  choosedCity: string;
  setChoosedCity: (city: string) => void;
}) {
  return (
    <>
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
      </div>
      <MobileSelector
        values={CITIES}
        selectedValue={
          CITIES.find((city) => city.value === choosedCity)?.name || ''
        }
        setSelectedValue={setChoosedCity}
        className={styles.MobileSelector}
      />
    </>
  );
}

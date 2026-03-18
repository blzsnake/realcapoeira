import { useEffect, useRef, useState } from 'react';
import {
  getCachedHomeWorldwideCities,
  getFallbackHomeWorldwideCities,
  loadHomeWorldwideCitiesWithFallback,
  type HomeWorldwideCity,
} from '~shared/content/worldwide';
import { Typography } from '~shared/ui/typography';
import { CityCard } from '~shared/ui/CityCard/CityCard';
import RightArrow from '~app/assets/right_arrow.svg?react';
import LeftArrow from '~app/assets/left_arrow.svg?react';
import { Button } from '~shared/ui/button/Button';
import styles from './Worldwide.module.css';

const getCityCardTitle = (city: HomeWorldwideCity) =>
  city.cityFriend ? city.country : city.cityName;

const getCityCardSubtitle = (city: HomeWorldwideCity) =>
  city.cityFriend ? 'Друзья школы' : city.country;

const getCityCardUrl = (city: HomeWorldwideCity) =>
  city.cityFriend || !city.cityId
    ? '/filials/'
    : `/filials/?city=${city.cityId}`;

export function Worldwide() {
  const [cities, setCities] = useState<HomeWorldwideCity[]>(
    getCachedHomeWorldwideCities() ?? getFallbackHomeWorldwideCities()
  );
  const refCountries = useRef<HTMLDivElement>(null);
  const handleClickToScroll = (data: number) => () =>
    refCountries?.current?.scrollBy({
      left: data,
      behavior: 'smooth',
    });

  useEffect(() => {
    let isMounted = true;

    const loadCities = async () => {
      try {
        const nextCities = await loadHomeWorldwideCitiesWithFallback();

        if (!isMounted) {
          return;
        }

        setCities(nextCities);
      } catch {
        // Keep fallback values if the client request fails.
      }
    };

    loadCities();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {cities.map((city) => (
            <CityCard
              key={city.id}
              title={getCityCardTitle(city)}
              subtitle={getCityCardSubtitle(city)}
              url={getCityCardUrl(city)}
              image={city.imageUrl}
            />
          ))}
          <div className={styles.EmptyPlug} />
        </div>
      </div>
    </div>
  );
}

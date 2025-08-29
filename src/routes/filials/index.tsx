import { useEffect, useMemo, useRef, useState } from 'react';
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { useUrl } from '@tramvai/module-router';
import { FILIALS_MOCK } from '~shared/mocks';
import Pin from '~app/assets/Pin.svg';
import PinActive from '~app/assets/PinActive.svg';
import { FilialCard } from './ui/FilialCard/FilialCard';
import { Filter } from './ui/Filter/Filter';

import styles from './Filials.module.css';
import { filterFilials } from './utils/filter';

const getHintData = (city: string, metro: string, street: string) =>
  metro
    ? `<b>Филиал на ${metro}</b><pre><b>метро ${metro}</b><div>г ${city} ${street}</div>`
    : `<b>Филиал в г ${city}</b><div>${street}</div>`;

function CustomZoomControls({
  zoom,
  setZoom,
}: {
  zoom: number;
  setZoom: (x: number) => void;
}) {
  return (
    <div className={styles.ZoomControls}>
      <button
        type="button"
        className={styles.ZoomButton}
        onClick={() => setZoom(zoom + 1)}
      >
        +
      </button>
      <button
        type="button"
        className={styles.ZoomButton}
        onClick={() => setZoom(zoom - 1)}
      >
        –
      </button>
    </div>
  );
}
export function FilialsPage() {
  const [zoom, setZoom] = useState(10);
  const [activeId, setActiveId] = useState<number | null>(null);
  const mapRef = useRef(null);
  const listRef = useRef({});
  const { query } = useUrl();
  const [filials = [], markers = []] = useMemo(
    () => filterFilials(FILIALS_MOCK, query),
    [query]
  );
  console.log(filials, markers);

  const handleMarkerClick = (id: number, coords: number[]) => () => {
    if (listRef.current[id]) {
      listRef.current[id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    setActiveId(id);
    if (mapRef.current) {
      mapRef.current.panTo(coords, { flying: true });
      mapRef.current.setCenter(coords, 14, { duration: 200 });
    }
  };

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      const bounds = markers.reduce(
        (acc, { coords }) => {
          return [
            [Math.min(acc[0][0], coords[0]), Math.min(acc[0][1], coords[1])],
            [Math.max(acc[1][0], coords[0]), Math.max(acc[1][1], coords[1])],
          ];
        },
        [
          [Infinity, Infinity],
          [-Infinity, -Infinity],
        ]
      );
      mapRef.current?.setBounds(bounds, {
        checkZoomRange: true,
        zoomMargin: 15,
      });
    }
  }, [markers, query]);

  console.log(listRef);

  return (
    <YMaps query={{ apikey: 'fcf49c8d-b16f-4277-ab7a-d08242e838b8' }}>
      <main className={styles.Wrap}>
        <div className={styles.InfoWrap}>
          <div className={styles.Filter}>
            <Filter />
          </div>
          <div className={styles.FilialsList}>
            {markers.map((item) => (
              <FilialCard
                {...item}
                activeId={activeId}
                key={item.id}
                ref={(el) => (listRef.current[item.id] = el)}
              />
            ))}
          </div>
        </div>
        <div className={styles.MapWrap}>
          <CustomZoomControls zoom={zoom} setZoom={setZoom} />
          <Map
            className={styles.Map}
            instanceRef={(ref) => (mapRef.current = ref)}
            modules={['geoObject.addon.hint']}
            state={{
              zoom,
              center: markers[0]?.coords || [55.793698, 37.708868],
            }}
          >
            <Clusterer
              options={{
                preset: 'islands#blackClusterIcons',
                groupByCoordinates: false,
              }}
            >
              {markers.map((marker) => (
                <Placemark
                  key={marker.id}
                  geometry={marker.coords}
                  options={{
                    iconLayout: 'default#image',
                    iconImageSize: [40, 40],
                    preset: 'islands#icon',
                    iconImageHref: activeId === marker.id ? PinActive : Pin,
                  }}
                  onClick={handleMarkerClick(marker.id, marker.coords)}
                  properties={{
                    hintContent: getHintData(
                      marker.city,
                      marker.metro,
                      marker.street
                    ),
                  }}
                />
              ))}
            </Clusterer>
          </Map>
        </div>
      </main>
    </YMaps>
  );
}

FilialsPage.seo = {
  metaTags: {
    title: 'Филиалы Real Capoeira',
  },
};

export default FilialsPage;

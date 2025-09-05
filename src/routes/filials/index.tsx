import { useEffect, useMemo, useRef, useState } from 'react';
import { useEvents, useSelector } from '@tramvai/state';
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { useUrl } from '@tramvai/module-router';
import { FILIALS_MOCK } from '~shared/mocks';
import Pin from '~app/assets/Pin.svg';
import PinActive from '~app/assets/PinActive.svg';
import { setModalState, ModalStore } from '~shared/ui/modal/store';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import CallButton from '~app/assets/call_button.svg?react';
import FilterIcon from '~app/assets/filter.svg?react';
import { SignUpModal } from './modals/SignUpModal/SignUpModal';
import { ContactsModal } from './modals/ContactsModal/ContactsModal';
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
  const [coaches, setCoaches] = useState<
    {
      name: string;
      phone: string;
    }[]
  >([]);
  const [isVisible, setIsVisible] = useState(false);
  const [zoom, setZoom] = useState(10);
  const $setModalState = useEvents(setModalState);
  const [activeId, setActiveId] = useState<number | null>(null);
  const onModalSetState =
    (
      coaches?: {
        name: string;
        phone: string;
      }[]
    ) =>
    (state: boolean, type: string) =>
    () => {
      if (coaches) {
        setCoaches(coaches);
      }
      $setModalState({ type, isOpen: state });
    };
  const mapRef = useRef(null);
  const listRef = useRef({});
  const { query } = useUrl();
  const isModalOpen = useSelector(
    ModalStore,
    ({ modals }) => modals.signUp?.isOpen
  );
  const isModalContactOpen = useSelector(
    ModalStore,
    ({ modals }) => modals.contacts?.isOpen
  );
  const [filials = [], markers = []] = useMemo(
    () => filterFilials(FILIALS_MOCK, query),
    [query]
  );

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

  const handleFilialClick = (id: number, coords: number[]) => () => {
    mapRef.current.panTo(coords, { flying: true });
    mapRef.current.setCenter(coords, 14, { duration: 200 });
    console.log(id, coords);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const isMobile = window.matchMedia('(max-width: 1280px)').matches;
    const toggleVisibility = () => {
      if (!isMobile) return;
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', toggleVisibility);
    }

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

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

  return (
    <YMaps query={{ apikey: 'fcf49c8d-b16f-4277-ab7a-d08242e838b8' }}>
      <main className={styles.Wrap} onScroll={(e) => console.log('dd')}>
        <div className={styles.InfoWrap} onScroll={(e) => console.log('dd')}>
          <div className={styles.Filter}>
            <Filter />
          </div>
          <div className={styles.Counter}>
            {`Найдено ${markers?.length} филиалов`}
            <FilterIcon className={styles.FilterIcon} />
          </div>
          <div className={styles.FilialsList}>
            {markers.map((item) => (
              <FilialCard
                {...item}
                activeId={activeId}
                key={item.id}
                ref={(el) => (listRef.current[item.id] = el)}
                onButtonClick={onModalSetState(item.coaches)}
                onCardClick={handleFilialClick(item.id, item.coords)}
              />
            ))}
          </div>
          {isVisible ? (
            <div className={styles.WrapperToMapButton}>
              <Button
                className={styles.Button}
                onClick={() => window.scrollTo(0, 0)}
              >
                <Typography
                  className={styles.ButtonText}
                  weight="medium"
                  color="white"
                >
                  На карту
                </Typography>
              </Button>
            </div>
          ) : null}
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
        <SignUpModal
          isOpen={isModalOpen}
          closeModal={onModalSetState()(false, 'signUp')}
          fullTitle="Запишитесь за пару минут"
        >
          <SignUpFormGroup
            description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
            phone="+7 (925) 555 00 77"
            title=""
            theme="white"
            className={styles.ModalForm}
          />
        </SignUpModal>
        <ContactsModal
          isOpen={isModalContactOpen}
          closeModal={onModalSetState()(false, 'contacts')}
          fullTitle="Контакты"
        >
          <Typography>
            Позвоните, чтобы задать интересующие вопросы и записаться на
            тренировку
          </Typography>
          {coaches.map((coach) => (
            <div key={coach.phone} className={styles.ContactsModalWrap}>
              <div className={styles.ContactsModalName}>{coach.name}</div>
              <a
                href={`tel: ${coach.phone}`}
                className={styles.ContactsModalPhone}
              >
                <CallButton className={styles.IconCallButton} />
              </a>
            </div>
          ))}
        </ContactsModal>
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

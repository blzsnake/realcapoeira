import { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useEvents, useSelector } from '@tramvai/state';
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { useUrl } from '@tramvai/module-router';
import {
  getCityOptionsFromFilialsSource,
  getCoachOptionsFromFilialsSource,
} from '~shared/content/catalogs';
import {
  getFallbackFilialsSource,
  getSignUpFilialValue,
  loadFilialsSourceWithFallback,
} from '~shared/content/filials';
import Pin from '~app/assets/Pin.svg';
import PinActive from '~app/assets/PinActive.svg';
import { setModalState, ModalStore } from '~shared/ui/modal/store';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { YMAPS_API_KEY } from '~shared/config/public';
import CallButton from '~app/assets/call_button.svg?react';
import FilterIcon from '~app/assets/filter.svg?react';
import { SignUpModal } from './modals/SignUpModal/SignUpModal';
import { ContactsModal } from './modals/ContactsModal/ContactsModal';
import { FilialCard } from './ui/FilialCard/FilialCard';
import { Filter } from './ui/Filter/Filter';

import styles from './Filials.module.css';
import type { TQuery } from './utils/filter';
import { filterFilials } from './utils/filter';
import { useStickyFilter } from './utils/useStickyFilter';
import { FilterModal } from './modals/FilterModal/FilterModal';
import { EmptyCard } from './ui/EmptyCard/FilialCard/EmptyCard';

const getHintData = (city: string, metro: string, street: string) =>
  metro
    ? `<b>Филиал на ${metro}</b><pre><b>метро ${metro}</b><div>${city} ${street}</div>`
    : `<b>Филиал в ${city}</b><div>${street}</div>`;

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
      selectedCoaches?: {
        name: string;
        phone: string;
      }[],
      address?: string
    ) =>
    (state: boolean, type: string) =>
    () => {
      if (selectedCoaches) {
        setCoaches(selectedCoaches);
      }
      $setModalState({ type, isOpen: state, address });
    };
  const mapRef = useRef<ymaps.Map | null>(null);
  const mapWrapRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const listRef = useRef<Record<number, HTMLDivElement | null>>({});
  const { query } = useUrl();
  const { isModalOpen, isModalContactOpen, isModalFiterOpen } = useSelector(
    ModalStore,
    ({ modals }) => ({
      isModalOpen: modals.signUp?.isOpen,
      isModalContactOpen: modals.contacts?.isOpen,
      isModalFiterOpen: modals.filter?.isOpen,
    })
  );
  const [filialsSource, setFilialsSource] = useState(getFallbackFilialsSource);
  const cityOptions = useMemo(
    () => getCityOptionsFromFilialsSource(filialsSource),
    [filialsSource]
  );
  const coachOptions = useMemo(
    () => getCoachOptionsFromFilialsSource(filialsSource),
    [filialsSource]
  );
  const [, markers = []] = useMemo(
    () => filterFilials(filialsSource, query as TQuery),
    [filialsSource, query]
  );

  const moveToPin = (coords: number[]) => {
    mapRef.current?.panTo(coords, { flying: true });
    mapRef.current?.setCenter(coords, 14, { duration: 200 });
  };

  const handleMarkerClick = (id: number, coords: number[]) => () => {
    if (listRef.current && listRef.current[id]) {
      listRef.current[id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    setActiveId(id);
    if (mapRef.current) {
      moveToPin(coords);
    }
  };

  const handleFilialClick = (id: number, coords: number[]) => () => {
    setActiveId(id);
    moveToPin(coords);

    if (window.matchMedia('(max-width: 1280px)').matches) {
      mapWrapRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const position = useStickyFilter();
  const getCounterStyles = () =>
    cn(styles[`Counter${position}`], styles.Counter);

  useEffect(() => {
    let cancelled = false;

    const loadFilials = async () => {
      const nextSource = await loadFilialsSourceWithFallback();

      if (!cancelled) {
        setFilialsSource(nextSource);
      }
    };

    loadFilials();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1280px)').matches;
    window.scrollTo(0, isMobile ? 300 : 0);
    const toggleVisibility = () => {
      if (!isMobile) return;
      if (window.pageYOffset > 380) {
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
        zoomMargin: [15],
      });
    }
  }, [markers, query]);

  return (
    <YMaps query={{ apikey: YMAPS_API_KEY }}>
      <main className={styles.Wrap}>
        <div className={styles.InfoWrap} draggable="true" id="#infoWrap">
          <div className={styles.Filter}>
            <Filter cityOptions={cityOptions} coachOptions={coachOptions} />
          </div>
          <div className={getCounterStyles()}>
            {markers?.length ? `Найдено ${markers?.length} филиалов` : ''}
            <FilterIcon
              className={styles.FilterIcon}
              onClick={onModalSetState()(true, 'filter')}
            />
          </div>
          {!markers?.length && <EmptyCard />}
          <div className={styles.FilialsList} id="#filterScrollMarker">
            {markers.map((item) => (
              <FilialCard
                {...item}
                activeId={activeId}
                key={item.id}
                ref={(el) => (listRef.current[item.id] = el)}
                onButtonClick={onModalSetState(
                  item.coaches,
                  getSignUpFilialValue(item)
                )}
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
        <div ref={mapWrapRef} className={styles.MapWrap}>
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
        <FilterModal
          isOpen={isModalFiterOpen}
          closeModal={onModalSetState()(false, 'filter')}
          cityOptions={cityOptions}
          coachOptions={coachOptions}
        />
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

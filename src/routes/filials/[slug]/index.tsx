import { useEffect, useMemo, useState } from 'react';
import { Link, useRoute } from '@tramvai/module-router';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { StructuredText } from 'react-datocms/structured-text';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import { Button } from '~shared/ui/button/Button';
import { loadCoachesWithFallback } from '~shared/content/coaches';
import {
  getFallbackFilialDetail,
  getFilialTitle,
  loadFilialDetailWithFallback,
} from '~shared/content/filials';
import type { Coach } from '~shared/api/types/coach';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { Typography } from '~shared/ui/typography';

import styles from './FilialDetail.module.css';

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const GROUP_LABELS: Record<string, string> = {
  junior: 'Дети 3–6 лет',
  middle: 'Дети 7–10 лет',
  senior: 'Дети 11–15 лет',
  staff: 'Взрослые и подростки 16+',
};

const GROUP_ORDER = ['junior', 'middle', 'senior', 'staff'];

const PRICE_LABELS = [
  { key: 'trialLessonPrice', label: 'Первое занятие' },
  { key: 'singleLessonPrice', label: 'Разовое занятие' },
  { key: 'monthlyPrice', label: '1 месяц занятий' },
] as const;

const PREPARATION_ITEMS = [
  {
    title: 'Если вы в первый раз',
    content:
      'Не волнуйтесь — наши тренеры умеют работать с новичками и к каждому ищут индивидуальный подход. Позвоните, чтобы записаться на занятие и получить ответы на любые вопросы.',
  },
  {
    title: 'Что взять на тренировку',
    content:
      'Удобную спортивную форму, носки, тапочки для раздевалки и душа, полотенце, средства личной гигиены и питьевую воду.',
  },
  {
    title: 'Совет родителям',
    content:
      'Малышам 3-10 лет удобно надевать разные носки на левую и правую ногу. Так детям легче ориентироваться в упражнениях.',
  },
  {
    title: 'Когда лучше прийти на занятие',
    content:
      'Приходите за 10-15 минут до начала. Так вы спокойно переоденетесь, познакомитесь с тренером и подготовитесь к занятию.',
  },
];

type FilialCoachCard = {
  slug: string;
  name: string;
  level: string;
  nick: string;
  photoUrl: string;
  groups: string[];
};

const getCoachShortName = (name: string) => {
  const [lastName, firstName] = name.split(' ');

  return firstName ? `${firstName[0]}. ${lastName}` : name;
};

const formatPrice = (value: number | null) =>
  value === 0 ? 'Бесплатно' : `${value?.toLocaleString('ru-RU')} ₽`;

const buildMapLink = (lat: number, lng: number) =>
  `https://yandex.ru/maps/?ll=${lng}%2C${lat}&mode=search&pt=${lng}%2C${lat}&z=17`;

const parseTimeValue = (value: string) => {
  const normalized = value.trim().replace(/\s/g, '').replace('-', ':');
  const [hours = '0', minutes = '0'] = normalized.split(':');

  return Number(hours) * 60 + Number(minutes);
};

const DESKTOP_SCHEDULE_PX_PER_MINUTE = 1.65;
const DESKTOP_SCHEDULE_ITEM_HEIGHT = 104;
const DESKTOP_SCHEDULE_ITEM_GAP = 18;

function FilialDetailPage() {
  const route = useRoute();
  const { slug } = route.params;
  const [filial, setFilial] = useState(() => getFallbackFilialDetail(slug));
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [openPreparationIndex, setOpenPreparationIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      const [nextFilial, nextCoaches] = await Promise.all([
        loadFilialDetailWithFallback(slug),
        loadCoachesWithFallback(),
      ]);

      if (!cancelled) {
        setFilial(nextFilial);
        setCoaches(nextCoaches);
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title = filial ? `Филиал на ${getFilialTitle(filial)}` : 'Филиал';
  const signUpFilial =
    filial &&
    `${filial.address.city} ${filial.address.metro?.name || filial.address.street}`;
  const address = (() => {
    if (!filial) {
      return 'Страница филиала временно недоступна.';
    }

    if (filial.address.metro) {
      return `м. ${filial.address.metro.name}, ${filial.address.street}`;
    }

    return filial.address.street;
  })();
  const prices = useMemo(() => {
    if (!filial) {
      return [];
    }

    return PRICE_LABELS.filter(({ key }) => filial[key] !== null);
  }, [filial]);

  const coachCards = useMemo<FilialCoachCard[]>(() => {
    if (!filial?.coachRecords?.length) {
      return [];
    }

    return filial.coachRecords.map((coach) => {
      const fullCoach = coaches.find((item) => item.slug === coach.slug);

      return {
        slug: coach.slug,
        name: coach.name,
        level: fullCoach?.level || coach.level || '',
        nick: fullCoach?.nick || coach.nick || '',
        photoUrl: fullCoach?.photo?.url || coach.photo?.url || '',
        groups: fullCoach?.groups || [],
      };
    });
  }, [coaches, filial]);

  const scheduleCoachName = coachCards[0]
    ? getCoachShortName(coachCards[0].name)
    : '';
  const mobileScheduleDays = useMemo(
    () =>
      filial?.schedule
        ?.map((dayItems, index) => ({
          day: WEEK_DAYS[index],
          items: dayItems,
        }))
        .filter(({ items }) => items.length) ?? [],
    [filial]
  );
  const desktopScheduleMetrics = useMemo(() => {
    if (!filial?.schedule?.length) {
      return {
        minStart: 0,
        totalHeight: 0,
        dayLayouts: [] as { id: string; top: number }[][],
      };
    }

    const scheduleItems =
      filial.schedule.flatMap((dayItems) =>
        dayItems.map((item) => {
          const [timeFrom = '00:00', timeTo = timeFrom] = item.time.split('-');

          return {
            start: parseTimeValue(timeFrom),
            end: parseTimeValue(timeTo),
          };
        })
      ) ?? [];

    const minStart = Math.min(...scheduleItems.map((item) => item.start));
    const maxEnd = Math.max(...scheduleItems.map((item) => item.end));
    const dayLayouts = filial.schedule.map((dayItems) => {
      let previousBottom = 0;

      return dayItems.map((item) => {
        const [timeFrom = '00:00'] = item.time.split('-');
        const baseTop = Math.max(
          0,
          Math.round(
            (parseTimeValue(timeFrom) - minStart) *
              DESKTOP_SCHEDULE_PX_PER_MINUTE
          )
        );
        const top = Math.max(baseTop, previousBottom);

        previousBottom =
          top + DESKTOP_SCHEDULE_ITEM_HEIGHT + DESKTOP_SCHEDULE_ITEM_GAP;

        return {
          id: `${item.id}_${item.time}`,
          top,
        };
      });
    });
    const maxDayBottom = dayLayouts.reduce((result, dayLayout) => {
      if (!dayLayout.length) {
        return result;
      }

      const dayBottom =
        dayLayout[dayLayout.length - 1].top + DESKTOP_SCHEDULE_ITEM_HEIGHT;

      return Math.max(result, dayBottom);
    }, 0);
    const totalHeight = Math.max(
      280,
      Math.round(
        (maxEnd - minStart) * DESKTOP_SCHEDULE_PX_PER_MINUTE +
          DESKTOP_SCHEDULE_ITEM_GAP
      ),
      maxDayBottom
    );

    return {
      minStart,
      totalHeight,
      dayLayouts,
    };
  }, [filial]);
  const getDesktopScheduleItemStyle = (
    dayIndex: number,
    itemIndex: number
  ) => ({
    top: `${desktopScheduleMetrics.dayLayouts[dayIndex]?.[itemIndex]?.top ?? 0}px`,
  });

  const handleScrollToForm = () => {
    const element = document.getElementById('signup');

    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className={styles.Page}>
      <section className={styles.Hero}>
        <div className={styles.Container}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link viewTransition url="/filials/" className={styles.BackLink}>
            <span className={styles.BackIconWrap}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.BackIcon}
                aria-hidden="true"
              >
                <path
                  d="M12 5L5 12M5 12L12 19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.BackText}>К карте</span>
          </Link>

          <Typography component="h1" weight="demiBold" className={styles.Title}>
            {title}
          </Typography>

          <div className={styles.AddressRow}>
            {filial?.address.metro ? (
              <span
                className={styles.MetroDot}
                style={{ backgroundColor: filial.address.metro.color }}
              />
            ) : null}
            <Typography className={styles.Address}>{address}</Typography>
          </div>

          {filial?.heroImage?.url ? (
            <img
              src={filial.heroImage.url}
              alt={filial.heroImage.alt || title}
              className={styles.HeroImage}
            />
          ) : null}
        </div>
      </section>

      <section className={styles.Section}>
        <div className={styles.Container}>
          <div className={styles.TwoColumnSection}>
            <Typography
              component="h2"
              weight="demiBold"
              className={styles.SectionTitle}
            >
              О зале
            </Typography>
            <div className={styles.RichText}>
              {filial?.hallDescription?.value ? (
                <StructuredText data={filial.hallDescription} />
              ) : (
                <Typography>
                  Подробное описание зала скоро появится на этой странице.
                </Typography>
              )}
            </div>
          </div>
        </div>
      </section>

      {coachCards.length ? (
        <section className={styles.Section}>
          <div className={styles.Container}>
            <div className={styles.SectionHeading}>
              <Typography
                component="h2"
                weight="demiBold"
                className={styles.BigTitle}
              >
                Тренеры
              </Typography>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link viewTransition url="/coaches/" className={styles.AllLink}>
                Все
                <ArrowRight width={18} height={18} />
              </Link>
            </div>

            <div className={styles.CoachesList}>
              {coachCards.map((coach) => (
                <article key={coach.slug} className={styles.CoachCard}>
                  <div className={styles.CoachMain}>
                    {coach.photoUrl ? (
                      <img
                        src={coach.photoUrl}
                        alt={coach.name}
                        className={styles.CoachPhoto}
                      />
                    ) : (
                      <div className={styles.CoachPhotoStub} />
                    )}

                    <div className={styles.CoachInfo}>
                      <Typography
                        weight="demiBold"
                        className={styles.CoachName}
                      >
                        {coach.name}
                      </Typography>
                      {coach.level || coach.nick ? (
                        <Typography className={styles.CoachSubtitle}>
                          {[coach.level, coach.nick].filter(Boolean).join(' ')}
                        </Typography>
                      ) : null}
                      <div className={styles.CoachTags}>
                        {GROUP_ORDER.filter((group) =>
                          coach.groups.includes(group)
                        ).map((group) => (
                          <span key={group} className={styles.CoachTag}>
                            {GROUP_LABELS[group]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.CoachActions}>
                    <Button
                      color="yellow"
                      className={styles.CoachActionButton}
                      onClick={handleScrollToForm}
                    >
                      Записаться на занятие
                    </Button>
                    <Button
                      color="black"
                      className={styles.CoachActionButton}
                      url={`/coaches/${coach.slug}`}
                      target="_self"
                    >
                      О тренере
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {filial?.schedule?.length ? (
        <section className={styles.Section}>
          <div className={styles.Container}>
            <Typography
              component="h2"
              weight="demiBold"
              className={styles.BigTitle}
            >
              Расписание
            </Typography>

            <div className={styles.ScheduleDesktop}>
              <div className={styles.ScheduleHeaderRow}>
                {WEEK_DAYS.map((day) => (
                  <Typography
                    key={day}
                    component="h3"
                    weight="medium"
                    className={styles.ScheduleHeaderDay}
                  >
                    {day}
                  </Typography>
                ))}
              </div>

              <div
                className={`${styles.ScheduleGrid} ${styles.ScheduleGridDesktop}`}
              >
                {filial.schedule.map((dayItems, index) => (
                  <div
                    key={WEEK_DAYS[index]}
                    className={styles.ScheduleColumn}
                    data-empty={!dayItems.length}
                  >
                    <div
                      className={styles.ScheduleItems}
                      style={{
                        minHeight: `${desktopScheduleMetrics.totalHeight}px`,
                      }}
                    >
                      {dayItems.length ? (
                        dayItems.map((item, itemIndex) => (
                          <div
                            key={`${WEEK_DAYS[index]}_${item.id}_${item.time}`}
                            className={`${styles.ScheduleItem} ${styles.ScheduleItemDesktop}`}
                            style={getDesktopScheduleItemStyle(
                              index,
                              itemIndex
                            )}
                          >
                            <Typography className={styles.ScheduleGroup}>
                              {item.group}
                            </Typography>
                            <Typography
                              weight="demiBold"
                              className={styles.ScheduleTime}
                            >
                              {item.time.replace('-', ' - ')}
                            </Typography>
                            {scheduleCoachName ? (
                              <Typography className={styles.ScheduleCoach}>
                                {scheduleCoachName}
                              </Typography>
                            ) : null}
                          </div>
                        ))
                      ) : (
                        <div className={styles.ScheduleEmptyDesktop} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.ScheduleMobileList}>
              {mobileScheduleDays.map(({ day, items }) => (
                <section key={day} className={styles.ScheduleMobileDay}>
                  <Typography
                    component="h3"
                    weight="medium"
                    className={styles.ScheduleMobileTitle}
                  >
                    {day}
                  </Typography>
                  <div className={styles.ScheduleMobileItems}>
                    {items.map((item) => (
                      <div
                        key={`${day}_${item.id}_${item.time}`}
                        className={styles.ScheduleMobileItem}
                      >
                        <div className={styles.ScheduleMobileMain}>
                          <Typography className={styles.ScheduleGroup}>
                            {item.group}
                          </Typography>
                          {scheduleCoachName ? (
                            <Typography className={styles.ScheduleCoach}>
                              {scheduleCoachName}
                            </Typography>
                          ) : null}
                        </div>
                        <Typography
                          weight="demiBold"
                          className={styles.ScheduleMobileTime}
                        >
                          {item.time.replace('-', ' - ')}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {filial ? (
        <section className={styles.Section}>
          <div className={styles.Container}>
            <Typography
              component="h2"
              weight="demiBold"
              className={styles.BigTitle}
            >
              Филиал на карте
            </Typography>

            <div className={styles.MapCard}>
              <div className={styles.MapWrap}>
                <YMaps
                  query={{ apikey: 'fcf49c8d-b16f-4277-ab7a-d08242e838b8' }}
                >
                  <Map
                    className={styles.Map}
                    defaultState={{
                      center: filial.coords,
                      zoom: 16,
                    }}
                    modules={['geoObject.addon.hint']}
                  >
                    <Placemark
                      geometry={filial.coords}
                      options={{
                        preset: 'islands#blackIcon',
                      }}
                    />
                  </Map>
                </YMaps>
              </div>

              <div className={styles.MapMeta}>
                <div className={styles.MapAddressWrap}>
                  <span className={styles.MapPin}>•</span>
                  <Typography className={styles.MapAddress}>
                    Адрес: {filial.address.city}, {address}
                  </Typography>
                </div>
                <a
                  href={buildMapLink(filial.address.lat, filial.address.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.MapLink}
                >
                  <span className={styles.MapLinkTextDesktop}>
                    Смотреть на Яндекс картах
                  </span>
                  <span className={styles.MapLinkTextMobile}>
                    Открыть Яндекс Карты
                  </span>
                  <ArrowRight
                    width={18}
                    height={18}
                    className={styles.MapLinkIcon}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {prices.length ? (
        <section className={styles.Section}>
          <div className={styles.Container}>
            <Typography
              component="h2"
              weight="demiBold"
              className={styles.BigTitle}
            >
              Стоимость
            </Typography>

            <div className={styles.PricesGrid}>
              {prices.map(({ key, label }) => (
                <article key={key} className={styles.PriceCard}>
                  <Typography className={styles.PriceLabel}>{label}</Typography>
                  <Typography weight="demiBold" className={styles.PriceValue}>
                    {formatPrice(filial?.[key] ?? null)}
                  </Typography>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.Section}>
        <div className={styles.Container}>
          <div className={styles.TwoColumnSection}>
            <Typography
              component="h2"
              weight="demiBold"
              className={styles.SectionTitle}
            >
              Подготовка к занятию
            </Typography>

            <div className={styles.Preparation}>
              {PREPARATION_ITEMS.map((item, index) => {
                const isOpen = openPreparationIndex === index;

                return (
                  <div key={item.title} className={styles.AccordionItem}>
                    <button
                      type="button"
                      className={styles.AccordionButton}
                      onClick={() =>
                        setOpenPreparationIndex(isOpen ? -1 : index)
                      }
                    >
                      <span className={styles.AccordionTitle}>
                        {item.title}
                      </span>
                      <span className={styles.AccordionIcon}>
                        {isOpen ? '×' : '+'}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className={styles.AccordionContent}>
                        <Typography className={styles.AccordionText}>
                          {item.content}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.FormSection}>
        <div className={styles.Container}>
          <SignUpFormGroup
            className={styles.FormCard}
            title="Запишитесь за пару минут"
            description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
            phone="+7 (925) 555 00 77"
            defaultFilial={signUpFilial || undefined}
          />
        </div>
      </section>
    </main>
  );
}

FilialDetailPage.seo = {
  metaTags: {
    title: 'Филиал Real Capoeira',
  },
};

export default FilialDetailPage;

import { useEffect, useMemo } from 'react';
import { useRoute } from '@tramvai/module-router';
import { useSelector } from '@tramvai/state';
import { declareAction } from '@tramvai/core';
import { StructuredText } from 'react-datocms/structured-text';
import { CoachesStore, setCoaches } from '~shared/stores/coaches';
import { getCoachLinks } from '~shared/api/types/coach';
import {
  loadCoachesWithFallback,
  normalizeCoachSlug,
} from '~shared/content/coaches';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { Typography } from '~shared/ui/typography';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import MiniMapIcon from '~app/assets/MiniMapIcon.png';
import { HeaderPart } from './ui/HeaderPart';
import { Numbers } from './ui/Numbers';
import { Quote } from './ui/Quote';
import { Groups } from './ui/Groups';
import { Socials } from './ui/Socials';
import styles from './Coach.module.css';

const fetchCoachesAction = declareAction({
  name: 'fetchCoachesForDetail',
  async fn() {
    const currentCoaches = this.getState(CoachesStore);

    if (currentCoaches.length > 0) {
      return;
    }

    const coaches = await loadCoachesWithFallback();

    this.dispatch(setCoaches(coaches));
  },
});

function CoachPage() {
  const route = useRoute();
  const { id } = route.params;
  const coaches = useSelector(CoachesStore, (state) => state.coaches);

  const coach = useMemo(
    () =>
      coaches.find(
        (c) => normalizeCoachSlug(c.slug) === normalizeCoachSlug(id)
      ),
    [coaches, id]
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [id]);

  if (!coach) return null;

  const links = getCoachLinks(coach);

  return (
    <main className={styles.PageWrap}>
      <HeaderPart />
      <Numbers
        city={coach.city}
        incapoeira={coach.incapoeira}
        since={coach.since}
        level={coach.level}
      />
      <div className={styles.ContentWithPadding}>
        <div className={styles.ContentBlock}>
          <div className={styles.InfoBlock}>
            <Groups groups={coach.groups} />
            <Socials links={links} />
          </div>
          <div className={styles.TextBlock}>
            <div className={styles.Description}>
              {coach.selfDescription?.value && (
                <StructuredText data={coach.selfDescription} />
              )}
            </div>
            <a
              href={`/filials?coach=${coach.slug}`}
              className={styles.FilialsCard}
            >
              <img
                src={MiniMapIcon}
                alt="Мини-карта филиалов"
                className={styles.FilialsIcon}
              />
              <Typography weight="medium" className={styles.FilialsTitle}>
                Где преподаю
              </Typography>
              <ArrowRight
                width={32}
                height={32}
                className={styles.FilialsArrow}
              />
            </a>
          </div>
        </div>
        <div className={styles.ContentBlock}>
          <div className={styles.InfoBlock}>
            <Typography weight="demiBold" className={styles.Classroom}>
              На занятиях
            </Typography>
          </div>
          <div className={styles.TextBlock}>
            <div className={styles.Description}>
              {coach.trainDescription?.value && (
                <StructuredText data={coach.trainDescription} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Quote
        name={coach.name}
        title={`${coach.level} ${coach.nick}`}
        photo={coach.photo?.url || ''}
        level={coach.level}
        quote={coach.quote}
      />
      <SignUpFormGroup
        title="Запишитесь за пару минут"
        description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
        phone="+7 (925) 555 00 77"
        preferredCoachSlug={coach.slug}
      />
    </main>
  );
}

CoachPage.actions = [fetchCoachesAction];

CoachPage.seo = {
  metaTags: {
    title: 'Инструктор Real Capoeira',
  },
};

export default CoachPage;

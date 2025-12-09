import { useEffect, useMemo } from 'react';
import { useRoute } from '@tramvai/module-router';
import { COACHES } from '~shared/mocks/coaches';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { Typography } from '~shared/ui/typography';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import MiniMapIcon from '~app/assets/MiniMapIcon.png';
import { HeaderPart } from './ui/HeaderPart';
import { Numbers } from './ui/Numbers';
import { Quote } from './ui/Quote';
import { Groups } from './ui/Groups';
import { Socials } from './ui/Socials';
import { COACH_PHOTOS } from '../utils';
import styles from './Coach.module.css';

function CoachPage() {
  const route = useRoute();
  const { id } = route.params;
  const formatedId = id.replace('_', '.');
  const coach = useMemo(
    () => COACHES.find((c) => c.id === formatedId),
    [formatedId]
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // 'auto' | 'smooth' | 'instant'
    });
  }, [id]);

  if (!coach) return null;

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
            <Socials links={coach.links} />
          </div>
          <div className={styles.TextBlock}>
            <Typography className={styles.Description}>
              {coach.selfDescription}
            </Typography>
            <a
              href={`/filials?coach=${coach.id}`}
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
            <Typography className={styles.Description}>
              {coach.trainDescription}
            </Typography>
          </div>
        </div>
      </div>
      <Quote
        name={coach.name}
        title={`${coach.level} ${coach.nick}`}
        photo={coach.photo || COACH_PHOTOS[coach.id]}
        level={coach.level}
        quote={coach.quote}
      />
      <SignUpFormGroup
        title="Запишитесь за пару минут"
        description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
        phone="+7 (925) 555 00 77"
      />
    </main>
  );
}

CoachPage.seo = {
  metaTags: {
    title: 'Инструктор Real Capoeira',
  },
};

export default CoachPage;

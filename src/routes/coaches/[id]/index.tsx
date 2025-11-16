import { useMemo } from 'react';
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
  const coach = useMemo(() => COACHES.find((c) => c.id === id), [id]);

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
        <div className={styles.FirstBlock}>
          <div className={styles.InfoBlock}>
            <Groups groups={coach.groups} />
            <Socials links={coach.links} />
          </div>
          <div className={styles.TextBlock}>
            <a
              href={`/filials/?coach=${coach.id}`}
              className={styles.FilialsCard}
            >
              <img
                src={MiniMapIcon}
                alt="Мини-карта филиалов"
                className={styles.FilialsIcon}
              />
              <Typography weight="medium" className={styles.FilialsTitle}>
                К филиалам
              </Typography>
              <ArrowRight
                width={32}
                height={32}
                className={styles.FilialsArrow}
              />
            </a>
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

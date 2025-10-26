import { useMemo } from 'react';
import { useRoute } from '@tramvai/module-router';
import { COACHES } from '~shared/mocks/coaches';
import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { HeaderPart } from './ui/HeaderPart';
import { Quote } from './ui/Quote';
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
      <div className={styles.ContentWithPadding} />
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

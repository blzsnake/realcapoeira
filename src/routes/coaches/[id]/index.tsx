import { useMemo } from 'react';
import { useRoute } from '@tramvai/module-router';
import { COACHES } from '~shared/mocks/coaches';
import styles from './Coach.module.css';
import { HeaderPart } from './ui/HeaderPart';

function CoachPage() {
  const route = useRoute();
  const { id } = route.params;
  const coach = useMemo(() => COACHES.find((c) => c.id === id), [id]);

  if (!coach) return null;

  return (
    <main className={styles.PageWrap}>
      <HeaderPart />
    </main>
  );
}

CoachPage.seo = {
  metaTags: {
    title: 'Инструктор Real Capoeira',
  },
};

export default CoachPage;

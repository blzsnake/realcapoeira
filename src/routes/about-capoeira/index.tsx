import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { HeaderPart } from './ui/HeaderPart';
import { HistoryAndMasters } from './ui/HistoryAndMasters/HistoryAndMasters';
import { CapoeiraComponents } from './ui/CapoeiraComponents';
import { Quote } from './ui/Quote';
import styles from './AboutCapoeira.module.css';

export function AboutCapoeiraPage() {
  return (
    <main className={styles.MainWrap}>
      <HeaderPart />
      <div className={styles.PageContent}>
        <HistoryAndMasters />
        <div className={styles.ContentWithPadding}>
          <CapoeiraComponents />
          <Quote />
          <SignUpFormGroup
            title="Запишитесь за пару минут"
            description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
            phone="+7 (925) 555 00 77"
          />
        </div>
      </div>
    </main>
  );
}

AboutCapoeiraPage.seo = {
  metaTags: {
    title: 'Что такое капоэйра',
  },
};

export default AboutCapoeiraPage;

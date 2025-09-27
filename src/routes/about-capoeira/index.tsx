import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { HeaderPart } from './ui/HeaderPart';
import styles from './AboutCapoeira.module.css';
import { HistoryAndMasters } from './ui/HistoryAndMasters/HistoryAndMasters';

export function AboutCapoeiraPage() {
  return (
    <main className={styles.MainWrap}>
      <HeaderPart />
      <div className={styles.PageContent}>
        <HistoryAndMasters />
        <div className={styles.ContentWithPadding}>
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

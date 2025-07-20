import { Link } from '@tramvai/module-router';

import styles from './index.module.css';
import { SchoolPhoto } from './ui/SchoolPhoto';

export function IndexPage() {
  return (
    <main>
      <SchoolPhoto />
      <div className={styles.Content}>
        <ul>
          <li>
            <Link url="/filials">Filials</Link>
          </li>
          <li>
            <Link url="/contacts">Contacts</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

IndexPage.seo = {
  metaTags: {
    title: 'Real Capoeira',
  },
};

export default IndexPage;

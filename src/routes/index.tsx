import { Link } from '@tramvai/module-router';

import styles from './index.module.css';

export function IndexPage() {
  return (
    <main style={{ height: 1500 }}>
      <p>Main Page</p>
      <ul>
        <li>
          <Link url="/filials">Filials</Link>
        </li>
        <li>
          <Link url="/contacts">Contacts</Link>
        </li>
      </ul>
    </main>
  );
}

IndexPage.seo = {
  metaTags: {
    title: 'Real Capoeira',
  },
};

export default IndexPage;

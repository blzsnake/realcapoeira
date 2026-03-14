import { useQueryParams } from '~shared/hooks/useQueryParams';
import {
  getAgeGroupOptions,
  getCityOptionsFromFilialsSource,
} from '~shared/content/catalogs';
import { getFallbackFilialsSource } from '~shared/content/filials';
import type { TabsContentProps } from './types';
import { TabsContentCity } from './TabsContentCity';

import styles from './TabsContent.module.css';

export function TabsContent({
  setActiveTab: _setActiveTab,
  activeTab,
}: TabsContentProps) {
  const cityOptions = getCityOptionsFromFilialsSource(
    getFallbackFilialsSource()
  );
  const [, , selectedCity, setQueryParam] = useQueryParams({
    pathname: '/filials',
    cityOptions,
    ageGroupOptions: getAgeGroupOptions(),
    coachOptions: [],
  });

  return (
    <div className={styles.TabsContent}>
      {activeTab === 'Город' ? (
        <TabsContentCity
          city={selectedCity?.[0]?.value}
          options={cityOptions[0]?.options || []}
          changeHander={setQueryParam('city')}
        />
      ) : null}
    </div>
  );
}

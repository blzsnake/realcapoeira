import { useState } from 'react';
import { Typography } from '~shared/ui/typography';
import { useQueryParams } from '~shared/hooks/useQueryParams';
import type { TabsContentProps } from './types';
import { TabsContentCity } from './TabsContentCity';

import styles from './TabsContent.module.css';

export function TabsContent({ setActiveTab, activeTab }: TabsContentProps) {
  const onTabClickHandler = (tab: string) => () => setActiveTab(tab);
  const [selectedAgeGroup, selectedCoach, selectedCity, setQueryParam] =
    useQueryParams();

  console.log(selectedCity, 'selectedCity');
  console.log(activeTab);
  return (
    <div className={styles.TabsContent}>
      {activeTab === 'Город' ? (
        <TabsContentCity
          city={selectedCity[0]?.value}
          changeHander={setQueryParam('city')}
        />
      ) : null}
    </div>
  );
}

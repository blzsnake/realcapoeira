import { useState } from 'react';
import { Typography } from '~shared/ui/typography';
import { GROUPED_PLACES } from '~shared/mocks';
import { Radio } from '~shared/ui/Radio/Radio';
import type { TabsContentCityProps } from './types';

import styles from './TabsContent.module.css';

function RadioOption({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <Radio
      checked={checked}
      text={label}
      name={value}
      classNameWrap={styles.RadioWrap}
      onChange={onChange}
    />
  );
}

export function TabsContentCity({ changeHander, city }: TabsContentCityProps) {
  // const onTabClickHandler = (activeTab: string) => () =>
  //   setActiveTab(activeTab);

  return (
    <div className={styles.TabsContentCity}>
      {GROUPED_PLACES[0].options.map((item) => (
        <RadioOption
          key={item.value}
          label={item.label}
          value={item.value}
          checked={item.value === city}
          onChange={changeHander}
        />
      ))}
    </div>
  );
}

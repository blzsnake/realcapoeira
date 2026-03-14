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

export function TabsContentCity({
  changeHander,
  city,
  options,
}: TabsContentCityProps) {
  return (
    <div className={styles.TabsContentCity}>
      {options.map((item) => (
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

import { Checkbox } from '~shared/ui/Checkbox/Checkbox';
import type { TypeOption } from '~shared/hooks/useQueryParams';
import type { TabsContenGroupsProps } from './types';

import styles from './TabsContent.module.css';

function CheckboxOption({
  label,
  value,
  checked,
  groupValues,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  groupValues: TypeOption[];
}) {
  return (
    <Checkbox
      groupValues={groupValues}
      name="group"
      checked={checked}
      text={label}
      onChange={onChange}
      value={value}
      classNameWrap={styles.RadioWrap}
    />
  );
}

export function TabsContentGroups({
  changeHander,
  selectedGroups,
  groups,
}: TabsContenGroupsProps) {
  return (
    <div className={styles.TabsContenGroups}>
      {groups.map((item) => (
        <CheckboxOption
          groupValues={selectedGroups || []}
          key={item.value}
          label={item.label}
          value={item.value}
          checked={
            !!selectedGroups?.find((group) => group.value === item.value)
          }
          onChange={changeHander}
        />
      ))}
    </div>
  );
}

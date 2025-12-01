import { Typography } from '~shared/ui/typography';
import styles from './Groups.module.css';

const GROUP_LABELS = {
  junior: 'Дети 3–6 лет',
  middle: 'Дети 7–10 лет',
  senior: 'Дети 11–15 лет',
  staff: 'Взрослые и подростки 16+',
} as const;

type GroupKey = keyof typeof GROUP_LABELS;

type GroupsProps = {
  groups?: readonly string[];
};

const GROUP_ORDER: GroupKey[] = ['junior', 'middle', 'senior', 'staff'];

export function Groups({ groups = [] }: GroupsProps) {
  const list = GROUP_ORDER.filter((group) => groups.includes(group));

  if (!list.length) {
    return null;
  }

  return (
    <section className={styles.Groups}>
      <Typography weight="demiBold" className={styles.Title}>
        Кого обучаю
      </Typography>
      <div className={styles.Tags}>
        {list.map((group) => (
          <Typography
            key={group}
            weight="medium"
            component="span"
            className={styles.Tag}
          >
            {GROUP_LABELS[group]}
          </Typography>
        ))}
      </div>
    </section>
  );
}

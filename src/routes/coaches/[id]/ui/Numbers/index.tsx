import { Typography } from '~shared/ui/typography';
import styles from './Numbers.module.css';

type NumbersProps = {
  city?: string;
  incapoeira?: string;
  since?: string;
  level?: string;
};

const formatValue = (value?: string) => value ?? '—';

const formatWithPrefix = (value?: string) => (value ? `С\u00A0${value}` : '—');

export function Numbers({ city, incapoeira, since, level }: NumbersProps) {
  const items = [
    {
      caption: 'Город',
      value: formatValue(city),
    },
    {
      caption: 'В капоэйре',
      value: formatWithPrefix(incapoeira),
    },
    {
      caption: 'Преподаю',
      value: formatWithPrefix(since),
    },
    {
      caption: 'Пояс',
      value: formatValue(level),
    },
  ];

  return (
    <section className={styles.Numbers}>
      <div className={styles.Panel}>
        {items.map(({ caption, value }) => (
          <div className={styles.Item} key={caption}>
            <Typography weight="medium" className={styles.Caption}>
              {caption}
            </Typography>
            <Typography weight="demiBold" className={styles.Value}>
              {value}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
}

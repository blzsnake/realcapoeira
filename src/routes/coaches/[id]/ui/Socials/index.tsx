import { Typography } from '~shared/ui/typography';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import styles from './Socials.module.css';

type Links = {
  tg?: string;
  inst?: string;
  vk?: string;
  wa?: string;
  youtube?: string;
};

type SocialsProps = {
  links?: Links;
};

const SOCIAL_LABELS = {
  vk: 'VK',
  tg: 'Telegram',
  inst: 'Instagram',
  youtube: 'YouTube',
} as const;

type SocialKey = keyof typeof SOCIAL_LABELS;

const SOCIAL_ORDER: SocialKey[] = ['vk', 'tg', 'inst', 'youtube'];

const buildSocialUrl = (key: SocialKey, value: string): string => {
  switch (key) {
    case 'vk':
      return `https://vk.com/${value}`;
    case 'tg':
      return `https://t.me/${value}`;
    case 'inst':
      return `https://instagram.com/${value}`;
    case 'youtube':
      return `https://youtube.com/${value.startsWith('@') ? value : `@${value}`}`;
    default:
      return '#';
  }
};

export function Socials({ links }: SocialsProps) {
  if (!links) {
    return null;
  }

  const items = SOCIAL_ORDER.filter(
    (key) => links[key] && links[key]!.trim()
  ).map((key) => ({
    key,
    label: SOCIAL_LABELS[key],
    url: buildSocialUrl(key, links[key]!),
  }));

  if (!items.length) {
    return null;
  }

  return (
    <section className={styles.Socials}>
      <Typography weight="demiBold" className={styles.Title}>
        Мои соцсети
      </Typography>
      <div className={styles.Grid}>
        {items.map(({ key, label, url }) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.Card}
          >
            <Typography weight="medium" className={styles.Label}>
              {label}
            </Typography>
            <ArrowRight width={24} height={24} className={styles.ArrowRight} />
          </a>
        ))}
      </div>
    </section>
  );
}

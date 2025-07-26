import { Link } from '@tramvai/module-router';
import { Typography } from '../typography';
import styles from './CityCard.module.css';
import type { TCityCardProps } from './types';

export function CityCard({ title, subtitle, url, image }: TCityCardProps) {
  const inlineStyles = {
    backgroundImage: `url(${image})`,
  };
  return (
    <Link url={url} className={styles.CityCard} style={inlineStyles}>
      {/* <Typography className={styles.Subtitle}>{subtitle}</Typography>
      <Typography className={styles.Title} component="h3" weight="demiBold">
        {title}
      </Typography> */}
    </Link>
  );
}

import { Typography } from '~shared/ui/typography';
import styles from './MasterCard.module.css';

export function MasterCard({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) {
  const inlineStyles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={styles.MasterCard}>
      <div style={inlineStyles} />
      <Typography
        color="white"
        className={styles.Title}
        component="h3"
        weight="demiBold"
      >
        {title}
      </Typography>
      <Typography color="white" className={styles.Subtitle}>
        {subtitle}
      </Typography>
    </div>
  );
}

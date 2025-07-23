import { Typography } from '~shared/ui/typography';
import styles from './About.module.css';

export function About() {
  return (
    <Typography component="h2" weight="demiBold" className={styles.Heading}>
      About
    </Typography>
  );
}

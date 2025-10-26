import cn from 'classnames';
import styles from './CoachAvatar.module.css';

export function CoachAvatar({
  photo,
  name,
  level,
  variant,
}: {
  photo: string;
  name: string;
  level: string;
  variant: 'micro' | 'small' | 'medium' | 'large';
}) {
  return (
    <div
      className={cn(styles.CoachAvatar, {
        [styles[level]]: level && variant !== 'micro',
        [styles[variant]]: variant,
      })}
    >
      <div className={styles.PhotoWrapper}>
        <img src={photo} alt={name} className={styles.Photo} />
      </div>
    </div>
  );
}

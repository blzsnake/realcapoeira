import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <h1>
        Footer{' '}
        <span role="img" aria-label="Salute">
          🥳
        </span>
      </h1>
    </footer>
  );
}

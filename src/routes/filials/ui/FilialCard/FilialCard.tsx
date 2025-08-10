import { Typography } from '~shared/ui/typography';
import styles from './FilialCard.module.css';
// import { ContactsPart } from './ui/ContactsPart';

export type TFilialCardData = {
  address: {
    city: string;
    metro: {
      name: string;
      color: string;
    };
    street: string;
    lat: number;
    lng: number;
  };
  coaches: {
    name: string;
    phone: string;
  }[];
};

export function FilialCard(props: TFilialCardData) {
  return (
    <div className={styles.FilialCard}>
      <Typography weight="demiBold" className={styles.Head}>
        {props?.address?.metro?.name}
      </Typography>
      <Typography
        className={styles.Address}
      >{`м. ${props?.address?.metro?.name} ${props?.address?.street}`}</Typography>
      <div className={styles.Coaches}>
        {props?.coaches?.map((coach) => (
          <Typography
            className={styles.Coach}
            key={coach.phone}
          >{`${coach.name} ${coach.phone}`}</Typography>
        ))}
      </div>
    </div>
  );
}

export default FilialCard;

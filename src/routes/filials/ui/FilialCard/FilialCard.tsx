import { Typography } from '~shared/ui/typography';
import styles from './FilialCard.module.css';
import { WEEK_DAYS } from '../../mock';
// import { ContactsPart } from './ui/ContactsPart';

type ScheduleItem = {
  group: string;
  time: string;
};

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
  schedule: ScheduleItem[][];
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
      <div className={styles.ScheduleWrap}>
        <div className={styles.ScheduleToggle}>Посмотреть расписание</div>
        <div className={styles.Schedule}>
          {props?.schedule?.map((item, index) => (
            <div className={styles.ScheduleItem}>
              <div className={styles.ScheduleWeekDay}>{WEEK_DAYS[index]}</div>
              <div className={styles.ScheduleGroups}>
                {item?.map((el) => (<>
                <div>{el.group}</div>
                <div>{el.time}</div>
                </>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilialCard;

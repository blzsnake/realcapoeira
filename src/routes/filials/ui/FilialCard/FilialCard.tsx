import cn from 'classnames';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import styles from './FilialCard.module.css';
import { WEEK_DAYS } from '../../../../shared/mocks';

import type { TFilialScheduleType } from '../Filter/types';

export type TFilialCardData = {
  activeId: number;
  id: number;
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
  schedule: TFilialScheduleType[];
  onButtonClick: () => void;
};

export type Ref = HTMLDivElement;

export const FilialCard = forwardRef<Ref, TFilialCardData>((props, ref) => {
  const [cardActive, setCardActive] = useState(props.id === props.activeId);
  const handleToggleSchedule = () => setCardActive(!cardActive);
  const { address, onButtonClick } = props;
  const addressName = useMemo(
    () =>
      address?.metro
        ? `м. ${address?.metro?.name} ${address?.street}`
        : address?.street,
    [address]
  );

  useEffect(
    () => setCardActive(props.id === props.activeId),
    [props.activeId, props.id]
  );
  return (
    <div
      ref={ref}
      className={cn(styles.FilialCard, {
        [styles.FilialCardActive]: cardActive,
      })}
    >
      <div className={styles.HeaderWrap}>
        <Typography weight="demiBold" className={styles.Head}>
          {address?.metro?.name || address?.city}
        </Typography>
        <Button
          color="yellow"
          className={styles.Button}
          onClick={onButtonClick}
        >
          Записаться
        </Button>
      </div>
      <Typography className={styles.Address}>
        {address.metro && (
          <div
            className={styles.AddressIcon}
            style={{ backgroundColor: address.metro.color }}
          />
        )}
        {addressName}
      </Typography>
      <div className={styles.Coaches}>
        {props?.coaches?.map((coach) => (
          <Typography
            className={styles.Coach}
            key={coach.phone}
          >{`${coach.name} ${coach.phone}`}</Typography>
        ))}
      </div>
      {cardActive ? (
        <div className={styles.ScheduleWrap}>
          <div className={styles.Schedule}>
            <div className={styles.ScheduleWrap}>
              {props?.schedule?.map((item, index) => (
                <div
                  key={`${WEEK_DAYS[index]}`}
                  className={styles.ScheduleItem}
                >
                  <Typography
                    weight="demiBold"
                    className={styles.ScheduleWeekDay}
                  >
                    {WEEK_DAYS[index]}
                  </Typography>
                  <div className={styles.ScheduleGroups}>
                    {item?.map((el) => (
                      <>
                        <Typography className={styles.ScheduleGroup}>
                          {el.group}
                        </Typography>
                        <Typography className={styles.ScheduleTime}>
                          {el.time}
                        </Typography>
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div onClick={handleToggleSchedule} className={styles.ScheduleToggle}>
        {cardActive ? 'Свернуть' : 'Показать расписание'}
      </div>
    </div>
  );
});

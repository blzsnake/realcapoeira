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
  schedule: TFilialScheduleType[][];
  onButtonClick: () => void;
};

export type Ref = HTMLDivElement;

export const FilialCard = forwardRef<Ref, TFilialCardData>((props, ref) => {
  const [cardActive, setCardActive] = useState(props.id === props.activeId);
  const [activeSchedule, setActiveSchedule] = useState(
    props.schedule?.findIndex((item) => item.length)
  );
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
        <div className="isTablet">
          <Button
            color="yellow"
            className={styles.Button}
            onClick={onButtonClick}
          >
            Записаться
          </Button>
        </div>
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
        <div>
          <div className={styles.Schedule}>
            <div className={styles.ScheduleWrap}>
              {props?.schedule?.map((item, index) => (
                <div
                  key={`${WEEK_DAYS[index]}`}
                  className={styles.ScheduleItem}
                >
                  <div
                    onClick={() => item?.length && setActiveSchedule(index)}
                    className={cn(styles.ScheduleWeekDay, {
                      [styles.ScheduleWeekDayDisabled]: !item?.length,
                      [styles.ScheduleWeekDayActive]: index === activeSchedule,
                    })}
                  >
                    {WEEK_DAYS[index]}
                  </div>
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
            <div className={styles.ScheduleGroupsMobile}>
              {props.schedule[activeSchedule]?.map((el) => (
                <div
                  key={`${el.time}_${el.id}`}
                  className={styles.ScheduleGroupsMobileRow}
                >
                  <Typography className={styles.ScheduleGroup}>
                    {el.group}
                  </Typography>
                  <Typography className={styles.ScheduleTime}>
                    {el.time}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div onClick={handleToggleSchedule} className={styles.ScheduleToggle}>
        {cardActive ? 'Свернуть' : 'Показать расписание'}
      </div>
      <div className="isMobile">
        <Button
          color="yellow"
          className={cn(styles.Button, styles.BottomButton)}
          onClick={onButtonClick}
        >
          Записаться
        </Button>
      </div>
    </div>
  );
});

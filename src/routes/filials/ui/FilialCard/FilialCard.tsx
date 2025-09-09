import { forwardRef, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';

import CallButton from '~app/assets/call_button.svg?react';

import styles from './FilialCard.module.css';
import { WEEK_DAYS } from '../../../../shared/mocks';

import type { TFilialScheduleType } from '../Filter/types';

export type TFilialCardData = {
  activeId: number | null;
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
  onButtonClick: (state: boolean, type: string) => () => void;
  onCardClick: () => void;
};

export type Ref = HTMLDivElement;

export const FilialCard = forwardRef<Ref, TFilialCardData>((props, ref) => {
  const [cardActive, setCardActive] = useState(props.id === props.activeId);
  const [activeSchedule, setActiveSchedule] = useState(
    props.schedule?.findIndex((item) => item.length)
  );
  const { address, onButtonClick, onCardClick } = props;
  const handleToggleSchedule = () => {
    setCardActive(!cardActive);
    onCardClick();
  };
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
      <div className={styles.HeaderWrap} onClick={onCardClick}>
        <Typography weight="demiBold" className={styles.Head}>
          {address?.metro?.name || address?.city}
        </Typography>
        <div className={styles.ButtonWrap}>
          <Button
            color="yellow"
            className={styles.Button}
            onClick={onButtonClick(true, 'signUp')}
          >
            Записаться
          </Button>
          <CallButton
            className={styles.IconCallButton}
            onClick={onButtonClick(true, 'contacts')}
          />
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
      {props?.coaches?.map((coach) => (
        <Typography
          className={styles.Coach}
          key={coach.phone}
        >{`${coach.name} ${coach.phone}`}</Typography>
      ))}
      {cardActive ? (
        <div className={styles.ScheduleWrap}>
          {props?.schedule?.map((item, index) => (
            <div
              key={`${WEEK_DAYS[index]}`}
              className={cn(styles.ScheduleItem, {
                [styles.ScheduleItem_empty]: !item.length,
              })}
            >
              <div
                // onClick={() => item?.length && setActiveSchedule(index)}
                className={cn(styles.ScheduleWeekDay, {
                  [styles.ScheduleWeekDayDisabled]: !item?.length,
                  // [styles.ScheduleWeekDayActive]: index === activeSchedule,
                })}
              >
                {WEEK_DAYS[index]}
              </div>
              <div className={styles.ScheduleGroups}>
                {item?.map((el) => (
                  <div
                    key={`${el.time}_${el.id}`}
                    className={styles.ScheduleGroupRow}
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
          ))}
          {/* <div className={styles.ScheduleGroupsMobile}>
              {props.schedule[activeSchedule]?.map((el) => (
                <div
                  key={`${el.time}_${el.id}`}
                  className={styles.ScheduleGroupsMobileColumn}
                >
                  <Typography className={styles.ScheduleGroup}>
                    {el.group}
                  </Typography>
                  <Typography className={styles.ScheduleTime}>
                    {el.time}
                  </Typography>
                </div>
              ))}
            </div> */}
        </div>
      ) : null}
      <div onClick={handleToggleSchedule} className={styles.ScheduleToggle}>
        {cardActive ? 'Свернуть' : 'Показать расписание'}
      </div>
      <div className={styles.ButtonBottomWrap}>
        <Button
          color="yellow"
          className={cn(styles.Button, styles.BottomButton)}
          onClick={onButtonClick(true, 'signUp')}
        >
          Записаться
        </Button>
        <CallButton
          className={styles.IconCallButton}
          onClick={onButtonClick(true, 'contacts')}
        />
      </div>
    </div>
  );
});

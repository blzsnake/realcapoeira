import { useState } from 'react';
import { Typography } from '~shared/ui/typography';
import Close from '~app/assets/Close.svg?react';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
import { Modal, ModalBody } from '~shared/ui/modal';
import { useQueryParams } from '~shared/hooks/useQueryParams';
import { AGE_GROUPS, COACHES } from '~shared/mocks';
import { FilterTabsToggle } from './ui/tabs/FilterTabsToggle';
import { TabsContentCity } from './ui/TabsContent/TabsContentCity';
import { TabsContentGroups } from './ui/TabsContent/TabsContenGroups';

import type { FilterModalProps } from './types';
import styles from './FilterModal.module.css';

export function FilterModal({ isOpen, closeModal }: FilterModalProps) {
  const [tabState, setTabState] = useState<string>('Фильтры');
  const [selectedAgeGroup, selectedCoach, selectedCity, setQueryParam] =
    useQueryParams();

  return (
    <Modal
      isCloseIcon={false}
      isOpen={isOpen}
      onClose={closeModal}
      className={styles.Modal}
    >
      <ModalBody>
        <div className={styles.Header}>
          <button style={{ opacity: 0, position: 'absolute' }} type="button">
            fix
          </button>
          {tabState === 'Фильтры' ? (
            <Close className={styles.Close} onClick={() => closeModal()} />
          ) : (
            <ArrowRight
              width={24}
              height={24}
              className={styles.ArrowRight}
              onClick={() => setTabState('Фильтры')}
            />
          )}
          <Typography weight="demiBold" className={styles.HeaderTitle}>
            {tabState}
          </Typography>
          <Typography color="blue" className={styles.HeaderReset}>
            {tabState === 'Фильтры' ? 'Сбросить' : ''}
          </Typography>
        </div>
        {tabState === 'Фильтры' ? (
          <FilterTabsToggle
            city={selectedCity ? selectedCity[0]?.label : 'Город'}
            age={
              selectedAgeGroup
                ? selectedAgeGroup.map((age) => age.label).join(', ')
                : 'Возраст ученика'
            }
            coach={
              selectedCoach
                ? selectedCoach.map((coach) => coach.label).join(', ')
                : 'Тренер'
            }
            setActiveTab={setTabState}
          />
        ) : null}
        <div className={styles.TabsContent}>
          {tabState === 'Город' ? (
            <TabsContentCity
              city={selectedCity ? selectedCity[0]?.value : null}
              changeHander={setQueryParam('city')}
            />
          ) : null}
          {tabState === 'Возраст ученика' ? (
            <TabsContentGroups
              groups={AGE_GROUPS}
              selectedGroups={selectedAgeGroup || null}
              changeHander={setQueryParam('group')}
            />
          ) : null}
          {tabState === 'Тренер' ? (
            <TabsContentGroups
              groups={COACHES}
              selectedGroups={selectedCoach || null}
              changeHander={setQueryParam('coach')}
            />
          ) : null}
        </div>
      </ModalBody>
    </Modal>
  );
}

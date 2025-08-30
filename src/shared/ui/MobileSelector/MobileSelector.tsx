import { useState } from 'react';
import cn from 'classnames';
import { Typography } from '../typography';
import SelectorArrow from '../../../app/assets/SelectorArrow.svg?react';
import type { TMobileSelector } from './types';
import styles from './MobileSelector.module.css';
import { Modal, ModalBody, ModalTitle } from '../modal';
import { Radiobutton } from '../RadioButton';

export function MobileSelector({
  values,
  selectedValue,
  setSelectedValue,
  className,
}: TMobileSelector) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={cn(styles.MobileSelector, className)}
        onClick={() => setIsOpen(true)}
      >
        <Typography className={styles.Text}>{selectedValue}</Typography>
        <SelectorArrow />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className={styles.Modal}
        >
          <ModalTitle className={styles.Wrap}>
            <Typography
              component="h2"
              weight="demiBold"
              className={styles.Title}
            >
              Город
            </Typography>
          </ModalTitle>
          <ModalBody>
            {values.map((value) => (
              <div
                key={value.value}
                className={styles.OptionRow}
                onClick={() => {
                  setSelectedValue(value.value);
                  setIsOpen(false);
                }}
              >
                <Typography className={styles.Text}>{value.name}</Typography>
                <Radiobutton checked={selectedValue === value.name} />
              </div>
            ))}
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

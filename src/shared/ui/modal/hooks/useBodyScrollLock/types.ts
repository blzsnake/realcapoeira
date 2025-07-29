import type React from 'react';

export type TBodyScrollLock = (opt: TOption) => void;

interface TOption {
  mounted: boolean;
  isOpen: boolean;
  layoutRef: React.RefObject<HTMLDialogElement | null>;
  scrollableRef?: TScrollableRef;
  disabled: boolean;
  isPopUp: boolean;
}

export type TScrollableRef =
  | React.RefObject<HTMLElement>
  | React.RefObject<HTMLElement>[];

export type TElement = EventTarget | null;

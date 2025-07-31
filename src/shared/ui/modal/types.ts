export type TModalLayoutProps = {
  onClose: (event?: Event) => void;
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
  isCloseIcon?: boolean;
  ignoreBackdropClick?: boolean;
  transparentBackdrop?: boolean;
  noBackdrop?: boolean;
  style?: React.CSSProperties;
  onAnimationEnd: React.AnimationEventHandler<HTMLDialogElement>;
  variantAnimation?: TVariantAnimation;
  variant?: TVariant;
  qaSelector?: string;
  isPopUp?: boolean;
  ['data-qa']?: string;
};

type TVariant = 'default' | 'full-for-mobile' | 'mobileViewOnly';

export type TModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  scrollableRef?: React.RefObject<any> | React.RefObject<any>[];
} & Omit<TModalLayoutProps, 'onAnimationEnd'>;

type TVariantAnimation = 'default' | 'side menu';

export type TFocusableElement = React.RefObject<
  HTMLInputElement | HTMLButtonElement | HTMLSelectElement | HTMLTextAreaElement
>;

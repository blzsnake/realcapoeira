export type EventModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  date: string;
  children: React.ReactNode;
};

export type EventModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  cardTitle?: string;
  fullTitle: string;
  description?: string;
  children: React.ReactNode;
};

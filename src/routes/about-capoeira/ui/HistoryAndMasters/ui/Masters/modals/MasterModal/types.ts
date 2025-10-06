export type MasterModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  name: string;
  dates: string;
  children: React.ReactNode;
};

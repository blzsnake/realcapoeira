export type MasterModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  name: string;
  children: React.ReactNode;
};

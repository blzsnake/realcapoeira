export type EventModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  date: string;
  smallTitle?: string;
  text?: string;
  photo?: string;
  place?: {
    title: string;
    address: string;
    additionalInfo: string;
  };
  mapCoordinates?: {
    latitude: number;
    longitude: number;
  };
  linkObj?: {
    image: string;
    title: string;
    link: string;
  };
};

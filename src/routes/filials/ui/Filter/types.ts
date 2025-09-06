export type TFilialAddressType = {
  city: string;
  metro: {
    name: string;
    color: string;
  };
  street: string;
  lat: number;
  lng: number;
};

export type TFilialCoachType = {
  name: string;
  phone: string;
  id: string;
};

export type TFilialScheduleType = {
  group: string;
  time: string;
  id: string;
};

export type TFilialType = {
  coords: number[];
  city: string;
  metro: string;
  street: string;
  id: number;
  address: TFilialAddressType;
  coaches: TFilialCoachType[];
  schedule: TFilialScheduleType[][];
};

export type TypeOption = {
  value: string;
  label: string;
};

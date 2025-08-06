export const CITIES: { name: string; value: TCity; phone: string }[] = [
  {
    name: 'Москва',
    value: 'moscow',
    phone: '+7 (925) 555 00 77',
  },
  {
    name: 'Казань',
    value: 'kazan',
    phone: '+7 (925) 555 00 77',
  },
  {
    name: 'Краснодар',
    value: 'krasnodar',
    phone: '+7 (928) 425 70 61',
  },
  {
    name: 'Лиссабон',
    value: 'lissabon',
    phone: '+351 (926) 599 117',
  },
];

export type TCity = 'moscow' | 'kazan' | 'krasnodar' | 'lissabon';

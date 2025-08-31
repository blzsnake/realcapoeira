import { korolev } from './cities/korolev';
import { krasnodar } from './cities/krasnodar';
import { krasnogorsk } from './cities/krasnogorsk';
import { lissabon } from './cities/lissabon';
import { moscow } from './cities/moscow';
import { mytishi } from './cities/mytishi';

export const FILIALS_MOCK = {
  moscow,
  krasnodar,
  // kazan: [],
  korolev,
  mytishi,
  krasnogorsk,
  lissabon,
  // europe: [],
  // lat_america: [],
  // america: [],
  // asia: [],
};

export const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const GROUPED_PLACES = [
  {
    options: [
      { value: 'moscow', label: 'Москва' },
      { value: 'korolev', label: 'Королев' },
      { value: 'mytishi', label: 'Мытищи' },
      { value: 'krasnogorsk', label: 'Красногорск' },
      { value: 'krasnodar', label: 'Краснодар' },
      // { value: 'kazan', label: 'Казань' },
      { value: 'lissabon', label: 'Лиссабон' },
    ],
  },
  // {
  //   label: 'Друзья школы',
  //   options: [
  //     { value: 'europe', label: 'Европа' },
  //     { value: 'lat_america', label: 'Латинская Америка' },
  //     { value: 'america', label: 'Северная Америка' },
  //     { value: 'asia', label: 'Азия' },
  //   ],
  // },
];

export const AGE_GROUPS = [
  { value: 'junior', label: '3–6 лет' },
  { value: 'middle', label: '7–10 лет' },
  { value: 'senior', label: '11–16 лет' },
  { value: 'staff', label: '16 лет и старше' },
];

export const COACHES = [
  { value: 'a.rogozin', label: 'Александр Рогозин' },
  { value: 't.rogozin', label: 'Тимур Рогозин' },
  { value: 'd.barhatov', label: 'Дмитрий Бархатов' },
  { value: 'a.magdych', label: 'Алексей Магдыч' },
  { value: 'm.rozhkov', label: 'Максим Рожков' },
  { value: 'd.popov', label: 'Молодожников Илья' },
  { value: 'i.molodozhnikov', label: 'Дмитрий Попов' },
  { value: 'a.chmyhov', label: 'Чмыхов Александр' },
  { value: 'e.staynow', label: 'Стейнау Екатерина' },
  { value: 'a.kedrova', label: 'Кедрова Алёна' },
  { value: 's.gromova', label: 'Громова Светлана' },
  { value: 's.afonina', label: 'Афонина Светлана' },
  { value: 'd.makarevich', label: 'Макаревич Дмитрий' },
  { value: 'a.politov', label: 'Политов Артем' },
  { value: 's.polyakova', label: 'Полякова Софья' },
  { value: 'm.frolova', label: 'Фролова Мария' },
  { value: 'm.miheev', label: 'Михеев Михаил' },
  { value: 'r.minnulin', label: 'Рамиль Миннуллин' },
  { value: 'a.zuykin', label: 'Зуйкин Алексей' },
  { value: 'k.sofiyskaya', label: 'Софийская Ксения' },
];

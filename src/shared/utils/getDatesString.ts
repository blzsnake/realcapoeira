export function getDatesString(dateFrom: string, dateTo: string): string {
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const [startDatePart] = dateFrom.split('T');
  const [endDatePart] = dateTo.split('T');
  const [startYear, startMonthStr, startDayStr] = startDatePart.split('-');
  const [endYear, endMonthStr, endDayStr] = endDatePart.split('-');

  const startDay = Number(startDayStr);
  const startMonth = Number(startMonthStr) - 1;
  const endDay = Number(endDayStr);
  const endMonth = Number(endMonthStr) - 1;

  const startMonthName = monthNames[startMonth];
  const endMonthName = monthNames[endMonth];

  if (startYear === endYear && startMonth === endMonth) {
    return `${startDay}–${endDay} ${startMonthName}`;
  }

  return `${startDay} ${startMonthName} – ${endDay} ${endMonthName}`;
}

// Примеры
console.log(getDatesString('2025-09-26', '2025-09-28')); // "26–28 сентября"
console.log(getDatesString('2025-10-31', '2025-11-02')); // "31 октября – 2 ноября"

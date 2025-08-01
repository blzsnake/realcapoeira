export function getDatesStringForEventCard(
  dateFrom: string,
  dateTo: string
): string {
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

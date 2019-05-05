import {range} from 'lodash';

export const isSameYear = (a, b) => a.getFullYear() === b.getFullYear();

export const isSameMonth = (a, b) =>
  isSameYear(a, b) && a.getMonth() === b.getMonth();

export const isSameDay = (a, b) =>
  isSameMonth(a, b) && a.getDate() === b.getDate();

export const isInRange = (date, start, end) => start <= date && date <= end;

/**
 * Given a date, how many days are in the month?
 *  Peek ahead to "next month" and look back to "last day of current month" via date=0
 * @param date
 * @return int
 */
export const daysInMonth = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

/**
 * Given a month date, provide "visible dates" for a calendar month.
 * 7 days per week. Padded with overflow from previous/next month.
 * @param monthDate
 * @return Date[]
 */
export const calendarMonthDates = monthDate => {
  const [prevMonth, currentMonth, nextMonth] = [-1, 0, 1].map(
    addMonths =>
      new Date(monthDate.getFullYear(), monthDate.getMonth() + addMonths)
  );

  const prevPadding = range(currentMonth.getDay())
    .reduce((days, i) => [daysInMonth(prevMonth) - i, ...days], [])
    .map(date => new Date(prevMonth.getFullYear(), prevMonth.getMonth(), date));

  const monthDates = range(1, daysInMonth(currentMonth) + 1).map(
    date => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date)
  );

  const lengthModulus = (prevPadding.length + monthDates.length) % 7;
  const nextPadding = range(
    lengthModulus ? Math.abs(lengthModulus - 7) : 0
  ).map(i => new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1));

  return [].concat(prevPadding, monthDates, nextPadding);
};

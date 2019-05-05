import {calendarMonthDates} from './date-utils';

describe('calendarMonthDates', () => {
  it('produces expected dates for January 2017', () => {
    const result = calendarMonthDates(new Date(2017, 0));

    const expectedDates = [
      // [i, [year, month, date]]
      [0, [2017, 0, 1]],
      [30, [2017, 0, 31]],
      [31, [2017, 1, 1]],
      [result.length - 1, [2017, 1, 4]],
    ];

    expectedDates.forEach(([resultIndex, expectedDateArgs]) => {
      const date = result[resultIndex];

      expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual(
        expectedDateArgs
      );
    });
  });
});

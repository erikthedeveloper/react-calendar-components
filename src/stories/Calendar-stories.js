import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Calendar from '../components/Calendar';
import SelectDateCalendar from '../components/SelectDateCalendar';
import DayIndicatorsCalendar from '../components/DayIndicatorsCalendar';
import SelectRangeCalendar from '../components/SelectRangeCalendar';

storiesOf('Calendar', module)
  .add('Calendar (basic)', () => {
    return <Calendar />;
  })

  .add('SelectDateCalendar', () => {
    return <SelectDateCalendar />;
  })

  .add('DayIndicatorsCalendar', () => {
    const now = new Date();
    const events = [-2, 3, 7, 15, 20, 40,].map((addDays) => ({
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays),
    }));

    return <DayIndicatorsCalendar events={events} />;
  })

  .add('SelectRangeCalendar', () => (
    <SelectRangeCalendar />
  ));

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Calendar from '../components/Calendar';
import SelectDateCalendar from '../components/SelectDateCalendar';

storiesOf('Calendar', module)
  .add('Calendar (basic)', () => {
    return <Calendar />;
  })

  .add('SelectDateCalendar', () => {
    return <SelectDateCalendar />;
  });

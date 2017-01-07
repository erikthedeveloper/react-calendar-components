import React from 'react';
import { storiesOf } from '@kadira/storybook';
import State from '../components/State';
import Calendar from '../components/Calendar';
import SelectDateCalendar, { selectDate } from '../components/SelectDateCalendar';
import DayIndicatorsCalendar, { dayIndicators } from '../components/DayIndicatorsCalendar';
import SelectRangeCalendar, { selectRange } from '../components/SelectRangeCalendar';
import { compose } from '../utils/utils';
import {
  mergeStateProps,
  monthState,
  selectDateState,
  eventsState,
} from './story-state';

storiesOf('Calendar', module)
  .add('Calendar (basic)', () => (
    <State {...monthState}>
      {(monthProps) => <Calendar {...monthProps} />}
    </State>
  ))

  .add('SelectDateCalendar', () => (
    <State {...mergeStateProps([monthState, selectDateState])}>
      {(stateProps) => <SelectDateCalendar {...stateProps} />}
    </State>
  ))

  .add('DayIndicatorsCalendar', () => {
    return (
      <State {...mergeStateProps([monthState, eventsState])}>
        {(monthProps) => <DayIndicatorsCalendar {...monthProps} />}
      </State>
    );
  })

  .add('SelectDate + DayIndicators', () => {
    const CalendarComponent = compose([
      selectDate,
      dayIndicators,
    ])(Calendar);

    return (
      <State {...mergeStateProps([monthState, selectDateState, eventsState])}>
        {(stateProps) => <CalendarComponent {...stateProps} />}
      </State>
    );
  })

  .add('SelectRangeCalendar', () => (
    <State {...monthState}>
      {(monthProps) => <SelectRangeCalendar {...monthProps} />}
    </State>
  ))

  .add('SelectRange + DayIndicators', () => {
    const CalendarComponent = compose([
      dayIndicators,
      selectRange,
    ])(Calendar);

    return (
      <State {...mergeStateProps([monthState, eventsState])}>
        {(stateProps) => <CalendarComponent {...stateProps} /> }
      </State>
    );

  });

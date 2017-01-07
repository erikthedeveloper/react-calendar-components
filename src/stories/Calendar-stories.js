import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { MergedState } from '../components/State';
import Calendar from '../components/Calendar';
import SelectDateCalendar, { selectDate } from '../components/SelectDateCalendar';
import DayIndicatorsCalendar, { dayIndicators } from '../components/DayIndicatorsCalendar';
import SelectRangeCalendar, { selectRange } from '../components/SelectRangeCalendar';
import { compose } from '../utils/utils';
import {
  monthState,
  selectDateState,
  eventsState,
} from './story-state';

storiesOf('Calendar', module)

  .add('Calendar (basic)', () => (
    <MergedState stateProps={[monthState]}>
      {(stateProps) => <Calendar {...stateProps} />}
    </MergedState>
  ))

  .add('SelectDateCalendar', () => (
    <MergedState stateProps={[monthState, selectDateState]}>
      {(stateProps) => <SelectDateCalendar {...stateProps} />}
    </MergedState>
  ))

  .add('DayIndicatorsCalendar', () => (
    <MergedState stateProps={[monthState, eventsState]}>
      {(stateProps) => <DayIndicatorsCalendar {...stateProps} />}
    </MergedState>
  ))

  .add('SelectDate + DayIndicators', () => {
    const CalendarComponent = compose([
      selectDate,
      dayIndicators,
    ])(Calendar);

    return (
      <MergedState stateProps={[monthState, selectDateState, eventsState]}>
        {(stateProps) => <CalendarComponent {...stateProps} />}
      </MergedState>
    );
  })

  .add('SelectRangeCalendar', () => (
    <MergedState stateProps={[monthState]}>
      {(stateProps) => <SelectRangeCalendar {...stateProps} />}
    </MergedState>
  ))

  .add('SelectRange + DayIndicators', () => {
    const CalendarComponent = compose([
      dayIndicators,
      selectRange,
    ])(Calendar);

    return (
      <MergedState stateProps={[monthState, eventsState]}>
        {(stateProps) => <CalendarComponent {...stateProps} /> }
      </MergedState>
    );
  });

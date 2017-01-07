import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { MergedState } from '../components/State';
import Calendar from '../components/Calendar';
import { selectDate, indicators, selectRange } from '../components/features';
import { compose } from '../utils/utils';
import {
  monthState,
  selectDateState,
  eventsState,
} from './story-state';

const SelectDateCalendar = selectDate(Calendar);
const DayIndicatorsCalendar = indicators(Calendar);
const SelectRangeCalendar = selectRange(Calendar);

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

  .add('IndicatorCalendar', () => (
    <MergedState stateProps={[monthState, eventsState]}>
      {(stateProps) => <DayIndicatorsCalendar {...stateProps} />}
    </MergedState>
  ))

  .add('SelectDate + DayIndicators', () => {
    const CalendarComponent = compose([
      selectDate,
      indicators,
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
      indicators,
      selectRange,
    ])(Calendar);

    return (
      <MergedState stateProps={[monthState, eventsState]}>
        {(stateProps) => <CalendarComponent {...stateProps} /> }
      </MergedState>
    );
  });

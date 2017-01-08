import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoryState } from '../components/State';
import Calendar from '../components/Calendar';
import { selectDate, indicators, selectRange } from '../components/features';
import { compose } from '../utils/utils';
import {
  monthState,
  selectDateState,
  selectRangeState,
  eventsState,
} from './story-state';

const SelectDateCalendar = selectDate(Calendar);
const DayIndicatorsCalendar = indicators(Calendar);
const SelectRangeCalendar = selectRange(Calendar);

storiesOf('Calendar', module)

  .add('Calendar (basic)', () => (
    <StoryState stateProps={[monthState]}>
      {(stateProps) => <Calendar {...stateProps} />}
    </StoryState>
  ))

  .add('SelectDateCalendar', () => (
    <StoryState stateProps={[monthState, selectDateState]}>
      {(stateProps) => <SelectDateCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('IndicatorCalendar', () => (
    <StoryState stateProps={[monthState, eventsState]}>
      {(stateProps) => <DayIndicatorsCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('SelectDate + DayIndicators', () => {
    const CalendarComponent = compose([
      selectDate,
      indicators,
    ])(Calendar);

    return (
      <StoryState stateProps={[monthState, selectDateState, eventsState]}>
        {(stateProps) => <CalendarComponent {...stateProps} />}
      </StoryState>
    );
  })

  .add('SelectRangeCalendar', () => (
    <StoryState stateProps={[monthState, selectRangeState]}>
      {(stateProps) => <SelectRangeCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('SelectRange + DayIndicators', () => {
    const CalendarComponent = compose([
      indicators,
      selectRange,
    ])(Calendar);

    return (
      <StoryState stateProps={[monthState, eventsState, selectRangeState]}>
        {(stateProps) => <CalendarComponent {...stateProps} /> }
      </StoryState>
    );
  })

  .add('Disable Weekends (inline example)', () => {
    const isWeekend = (date) => [0, 6].includes(date.getDay());
    /**
     * HoC with argument(s) to enhance Day
     * @param {function(Date): bool} shouldDisable
     */
    const disableDay = (shouldDisable) => (Day) => (props) => (
      <Day
        {...props}
        disabled={props.disabled || shouldDisable(props.date)}
      />
    );
    /** HoC to enhance Calendar. Enhances its own DayComponent as needed */
    const disableWeekends = (Calendar) => (props) => (
      <Calendar
        {...props}
        DayComponent={disableDay(isWeekend)(props.DayComponent)}
      />
    );

    const CalendarComponent = compose([
      indicators,
      selectRange,
      disableWeekends,
    ])(Calendar);

    return (
      <StoryState stateProps={[monthState, eventsState, selectRangeState]}>
        {(stateProps) => <CalendarComponent {...stateProps} /> }
      </StoryState>
    );
  });

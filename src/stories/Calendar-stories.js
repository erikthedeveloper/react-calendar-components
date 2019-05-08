import React from 'react';
import {storiesOf} from '@storybook/react';
import {StoryState} from '../components/State';
import Calendar from '../components/Calendar/Calendar';
import {selectDate} from '../components/Calendar/selectDate';
import {indicators} from '../components/Calendar/indicators';
import {selectRange} from '../components/Calendar/selectRange';
import {flowRight as compose} from 'lodash';
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
  .add('Select Date', () => (
    <StoryState stateProps={[monthState, selectDateState]}>
      {stateProps => <SelectDateCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('Day Indicators', () => (
    <StoryState stateProps={[monthState, eventsState]}>
      {stateProps => <DayIndicatorsCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('Select Range', () => (
    <StoryState stateProps={[monthState, selectRangeState]}>
      {stateProps => <SelectRangeCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('Select Date + Day Indicators', () => {
    const CalendarComponent = compose([selectDate, indicators])(Calendar);

    return (
      <StoryState stateProps={[monthState, selectDateState, eventsState]}>
        {stateProps => <CalendarComponent {...stateProps} />}
      </StoryState>
    );
  })

  .add('Select Range + Day Indicators', () => {
    const CalendarComponent = compose([indicators, selectRange])(Calendar);

    return (
      <StoryState stateProps={[monthState, eventsState, selectRangeState]}>
        {stateProps => <CalendarComponent {...stateProps} />}
      </StoryState>
    );
  });

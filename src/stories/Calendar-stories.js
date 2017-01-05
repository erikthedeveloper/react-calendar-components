import React from 'react';
import { storiesOf } from '@kadira/storybook';
import State from '../components/State';
import Calendar from '../components/Calendar';
import SelectDateCalendar from '../components/SelectDateCalendar';

const now = new Date();

const MonthState = (props) => {
  const initialState = {currentMonth: new Date()};
  const stateSetters = (setState) => ({
    setCurrentMonth: (currentMonth) => setState({currentMonth}),
  });

  return (
    <State initialState={initialState} stateSetters={stateSetters}>
      {props.children}
    </State>
  );
};

const SelectedDateState = (props) => (
  <State
    initialState={{
      selectedDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
    }}
    stateSetters={(setState) => ({
      selectDate: (selectedDate) => setState({selectedDate}),
    })}
  >
    {props.children}
  </State>
);

storiesOf('Calendar', module)
  .add('Calendar (basic)', () => (
    <MonthState>
      {(monthProps) => <Calendar {...monthProps} />}
    </MonthState>
  ))

  .add('SelectDateCalendar', () => (
    <MonthState>
      {(monthProps) => (
        <SelectedDateState>
          {(selectedProps) => <SelectDateCalendar {...monthProps} {...selectedProps} />}
        </SelectedDateState>
      )}
    </MonthState>
  ));

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import State from '../components/State';
import Calendar from '../components/Calendar';

storiesOf('Calendar', module)
  .add('Calendar (basic)', () => {
    const initialState = {currentMonth: new Date()};
    const stateSetters = (setState) => ({
      setCurrentMonth: (currentMonth) => setState({currentMonth}),
    });

    return (
      <State initialState={initialState} stateSetters={stateSetters}>
        {(stateProps) => (
          <Calendar
            currentMonth={stateProps.currentMonth}
            setCurrentMonth={stateProps.setCurrentMonth}
          />
        )}
      </State>
    );
  });

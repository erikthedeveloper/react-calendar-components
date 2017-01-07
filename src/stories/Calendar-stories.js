import React from 'react';
import { storiesOf } from '@kadira/storybook';
import State from '../components/State';
import Calendar from '../components/Calendar';
import SelectDateCalendar, { selectDate } from '../components/SelectDateCalendar';
import DayIndicatorsCalendar, { dayIndicators } from '../components/DayIndicatorsCalendar';
import Day from '../components/Day';
import { indicatorDay } from '../components/IndicatorDay';
import { selectableDay } from '../components/SelectDateDay';
import { rangeDay } from '../components/SelectRangeDay';
import SelectRangeCalendar, { selectRange } from '../components/SelectRangeCalendar';
import { compose } from '../utils/utils';

const now = new Date();

const events = [-2, 3, 7, 15, 20, 40].map((addDays) => ({
  date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays),
}));

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
  ))

  .add('DayIndicatorsCalendar', () => {
    return (
      <MonthState>
        {(monthProps) => <DayIndicatorsCalendar {...monthProps} events={events} />}
      </MonthState>
    );
  })

  .add('SelectDate + DayIndicators', () => {

    const DayComponent = compose([
      selectableDay,
      indicatorDay,
    ])(Day);

    const CalendarComponent = compose([
      selectDate,
      dayIndicators,
    ])(Calendar);

    const StateComponent = (props) => (
      <MonthState>
        {(monthProps) => (
          <SelectedDateState>
            {(selectedProps) => props.children(Object.assign({},
              monthProps,
              selectedProps,
              {events}
            ))}
          </SelectedDateState>
        )}
      </MonthState>
    );

    return (
      <StateComponent>
        {(stateProps) => (
          <CalendarComponent
            {...stateProps}
            DayComponent={DayComponent}
          />
        )}
      </StateComponent>
    );
  })

  .add('SelectRangeCalendar', () => (
    <MonthState>
      {(monthProps) => <SelectRangeCalendar {...monthProps} />}
    </MonthState>
  ))

  .add('SelectRange + DayIndicators', () => {

    const DayComponent = compose([
      rangeDay,
      indicatorDay,
    ])(Day);

    const CalendarComponent = compose([
      dayIndicators,
      selectRange,
    ])(Calendar);


    const StateComponent = (props) => (
      <MonthState>
        {(monthProps) => props.children({
          ...monthProps,
          events,
        })}
      </MonthState>
    );

    return (
      <StateComponent>
        {(stateProps) => (
          <CalendarComponent
            {...stateProps}
            DayComponent={DayComponent}
          />
        )}
      </StateComponent>
    );

  });

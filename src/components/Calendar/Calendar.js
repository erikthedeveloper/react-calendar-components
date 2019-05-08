import PropTypes from 'prop-types';
import React from 'react';
import './Calendar.css';
import {
  calendarMonthDates,
  isSameMonth,
  isSameDay,
  addMonths,
} from '../../utils/date-utils';
import Day from '../Day/Day';
import MonthGrid from '../MonthGrid';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class Calendar extends React.Component {
  incrementMonth = () => {
    this.props.setCurrentMonth(addMonths(this.props.currentMonth, 1));
  };

  decrementMonth = () => {
    this.props.setCurrentMonth(addMonths(this.props.currentMonth, -1));
  };

  render() {
    const {currentMonth, DayComponent} = this.props;

    const visibleDates = calendarMonthDates(currentMonth);

    return (
      <div className="Calendar">
        <div className="MonthHeader">
          <div className="MonthHeader__nav" onClick={this.decrementMonth}>
            &#10094;
          </div>
          <div className="MonthHeader__label">
            {MONTHS[currentMonth.getMonth()]}
          </div>
          <div className="MonthHeader__nav" onClick={this.incrementMonth}>
            &#10095;
          </div>
        </div>

        <div className="WeekdayLabels">
          {WEEKDAYS.map(label => (
            <div className="WeekdayLabels__label" key={label}>
              {label}
            </div>
          ))}
        </div>

        <MonthGrid>
          {visibleDates.map(date => (
            <DayComponent
              key={date.toString()}
              date={date}
              today={isSameDay(date, this.props.today)}
              disabled={!isSameMonth(date, currentMonth)}
            />
          ))}
        </MonthGrid>
      </div>
    );
  }
}

Calendar.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  today: PropTypes.instanceOf(Date),
  DayComponent: PropTypes.func,
};

Calendar.defaultProps = {
  today: new Date(),
  DayComponent: Day,
};

export default Calendar;

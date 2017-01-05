import React, { PropTypes } from 'react';
import './Calendar.css';
import { calendarMonthDates, isSameMonth, isSameDay } from '../utils/date-utils';
import Day from './Day';
import MonthGrid from './MonthGrid';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Calendar extends React.Component {
  constructor() {
    super(...arguments);

    this.incrementMonth = this.incrementMonth.bind(this);
    this.decrementMonth = this.decrementMonth.bind(this);
  }

  incrementMonth() {
    this.props.setCurrentMonth(new Date(
      this.props.currentMonth.getFullYear(),
      this.props.currentMonth.getMonth() + 1
    ));
  }

  decrementMonth() {
    this.props.setCurrentMonth(new Date(
      this.props.currentMonth.getFullYear(),
      this.props.currentMonth.getMonth() - 1
    ));
  }

  render() {
    const {currentMonth} = this.props;

    const visibleDates = calendarMonthDates(currentMonth);

    return (
      <div className="Calendar">

        <div className="MonthHeader">
          <div className="MonthHeader__nav" onClick={this.decrementMonth}>&#10094;</div>
          <div className="MonthHeader__label">
            {MONTHS[currentMonth.getMonth()]}
          </div>
          <div className="MonthHeader__nav" onClick={this.incrementMonth}>&#10095;</div>
        </div>

        <div className="WeekdayLabels">
          {WEEKDAYS.map((label) => (
            <div className="WeekdayLabels__label" key={label}>
              {label}
            </div>
          ))}
        </div>

        <MonthGrid>
          {visibleDates.map((date) => (
            <Day
              key={date.toString()}
              date={date}
              today={isSameDay(date, this.props.today)}
              disabled={!isSameMonth(date, currentMonth)}
            />
          ))}
        </MonthGrid>

      </div>
    )
  }
}

Calendar.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  today: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  today: new Date(),
};

export default Calendar;

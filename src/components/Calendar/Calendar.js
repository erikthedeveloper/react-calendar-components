import PropTypes from 'prop-types';
import React from 'react';
import './Calendar.css';
import {
  MONTHS,
  WEEKDAYS_SHORT,
  calendarMonthDates,
  isSameMonth,
  isSameDay,
  addMonths,
} from '../../utils/date-utils';
import Day from '../Day/Day';
import MonthGrid from '../MonthGrid';

class Calendar extends React.Component {
  incrementMonth = () => {
    this.props.setCurrentMonth(addMonths(this.props.currentMonth, 1));
  };

  decrementMonth = () => {
    this.props.setCurrentMonth(addMonths(this.props.currentMonth, -1));
  };

  render() {
    const {currentMonth, DayComponent} = this.props;
    const [prevMonth, nextMonth] = [-1, 1].map(n => addMonths(currentMonth, n));
    const formatMonth = date =>
      `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

    const visibleDates = calendarMonthDates(currentMonth);

    return (
      <div className="Calendar">
        <div className="MonthHeader">
          <button
            className="MonthHeader__nav"
            onClick={this.decrementMonth}
            type="button"
            aria-label={`Previous month, ${formatMonth(prevMonth)}`}
          >
            &#10094;
          </button>

          <div className="MonthHeader__label">
            {MONTHS[currentMonth.getMonth()]}
          </div>

          <button
            className="MonthHeader__nav"
            onClick={this.incrementMonth}
            type="button"
            aria-label={`Next month, ${formatMonth(nextMonth)}`}
          >
            &#10095;
          </button>
        </div>

        <div className="WeekdayLabels">
          {WEEKDAYS_SHORT.map(label => (
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

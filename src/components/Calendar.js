import React from 'react';
import './Calendar.css';
import { calendarMonthDates, isSameMonth, isSameDay } from '../utils/date-utils';
import { chunk } from '../utils/utils';
import Day from './Day';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Calendar extends React.Component {
  constructor() {
    super(...arguments);

    this.incrementMonth = this.incrementMonth.bind(this);
    this.decrementMonth = this.decrementMonth.bind(this);

    const { today } = this.props;
    this.state = {
      currentMonth: new Date(today.getFullYear(), today.getMonth()),
    };
  }

  incrementMonth() {
    const currentMonth = new Date(
      this.state.currentMonth.getFullYear(),
      this.state.currentMonth.getMonth() + 1
    );
    this.setState({currentMonth});
  }

  decrementMonth() {
    const currentMonth = new Date(
      this.state.currentMonth.getFullYear(),
      this.state.currentMonth.getMonth() - 1
    );
    this.setState({currentMonth});
  }

  render() {
    const {currentMonth} = this.state;

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

        <div className="MonthGrid">
          {chunk(visibleDates, 7).map((weekChunk, i) => (
            <div className="MonthGrid__row" key={i}>
              {weekChunk.map((date) => (
                <div className="MonthGrid__item" key={date.getMonth() + date.getDate()}>
                  <div className="MonthGrid__item__height" />
                  <div className="MonthGrid__item__content">

                  <Day
                    date={date}
                    today={isSameDay(date, this.props.today)}
                    disabled={!isSameMonth(date, currentMonth)}
                  />

                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    )
  }
}

Calendar.defaultProps = {
  today: new Date(),
};

export default Calendar;

import React from 'react';
import './Calendar.css';
import { range, chunk } from '../utils/utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MS_DAY = 1000 * 60 * 60 * 24;

class Calendar extends React.Component {

  getDayClassName(date) {
    const {today, currentMonth} = this.props;

    let className = 'Day';
    if (date.getMonth() !== currentMonth.getMonth())
      className += ' Day--disabled';
    if (Math.abs(date - today) < MS_DAY && date.getDate() === today.getDate())
      className += ' Day--today';
    return className
  }

  render() {
    const {currentMonth} = this.props;

    // Hardcode for January 2017
    const visibleDates = [
      ...range(1, 32).map((date) => new Date(2017, 0, date)),
      ...range(1, 5).map((date) => new Date(2017, 1, date)),
    ];

    return (
      <div className="Calendar">

        <div className="MonthHeader">
          <div className="MonthHeader__nav">&#10094;</div>
          <div className="MonthHeader__label">
            {MONTHS[currentMonth.getMonth()]}
          </div>
          <div className="MonthHeader__nav">&#10095;</div>
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

                    <div className={this.getDayClassName(date)}>
                      <div className="Day__date">
                        {date.getDate()}
                      </div>
                    </div>

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
  currentMonth: new Date(2017, 0),
};

export default Calendar;

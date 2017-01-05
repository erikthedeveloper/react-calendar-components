import React, { PropTypes } from 'react';
import Calendar from './Calendar';
import { isInRange, isSameDay } from '../utils/date-utils';
import withProps from './withProps';
import Day from './Day';

const rangeBarClassName = (date, range) => {
  let className = 'Day__range-bar';
  if (range.start && isSameDay(date, range.start)) {
    className += ' Day__range-bar--start';
  }
  if (range.end && isSameDay(date, range.end)) {
    className += ' Day__range-bar--end';
  }

  return className;
};

export default class SelectDateCalendar extends React.Component {
  constructor() {
    super(...arguments);

    this.DayComponent = withProps((props) => {
      const {range} = this.state;
      const {start, end, hover} = range;

      return ({
        onClick: () => this.handleClickDate(props.date),
        onMouseEnter: () => this.handleMouseEnterDate(props.date),
        children: isInRange(props.date, start, end || hover || start) && (
          <span className={rangeBarClassName(props.date, range)} />
        ),
      });
    })(Day);

    const now = new Date();
    this.state = {
      range: {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13),
        hover: undefined,
      },
    };
  }

  /**
   * @param {Date} date
   */
  handleClickDate(date) {
    const {range} = this.state;
    if (!range.start || date < range.start) {
      this.setState({
        range: {start: date, end: undefined},
      });
      return;
    }

    this.setState({
      range: {start: range.start, end: date},
    });
  }

  /**
   * @param {Date} date
   */
  handleMouseEnterDate(date) {
    const {range} = this.state;
    if (range.start && !range.end) {
      this.setState({
        range: {...this.state.range, hover: date},
      });
    }
  }

  render() {
    return (
      <Calendar {...this.props} DayComponent={this.DayComponent} />
    );
  }
}

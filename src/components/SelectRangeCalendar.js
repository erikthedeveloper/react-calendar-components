import React, { PropTypes } from 'react';
import Calendar from './Calendar';
import withProps from './withProps';
import Day from './Day';

/**
 * Higher Order Component to add "select range" feature
 * @param {Component} Component
 * @return {SelectRangeCalendar}
 */
function selectRange(Component) {
  class SelectRangeCalendar extends React.Component {
    constructor() {
      super(...arguments);

      this.displayName =
        `SelectRangeCalendar(${Component.displayName || Component.name})`;

      this.DayComponent = withProps((props) => ({
        range: this.state.range,
        onClick: () => this.handleClickDate(props.date),
        onMouseEnter: () => this.handleMouseEnterDate(props.date),
      }))(this.props.DayComponent);

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
        <Component {...this.props} DayComponent={this.DayComponent} />
      );
    }
  }

  SelectRangeCalendar.defaultProps = {
    DayComponent: Day,
  };

  return SelectRangeCalendar;
}

export default selectRange(Calendar);
export { selectRange };

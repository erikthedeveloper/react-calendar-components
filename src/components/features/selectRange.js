import React, { PropTypes } from 'react';
import { compose } from '../../utils/utils';
import withProps from '../withProps';
import Day from '../Day';
import { selectRangeDay } from './selectRangeDay';

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

      this.DayComponent = compose([
        withProps((props) => ({
          range: this.state.range,
          onClick: () => this.handleClickDate(props.date),
          onMouseEnter: () => this.handleMouseEnterDate(props.date),
        })),
        selectRangeDay,
      ])(this.props.DayComponent);

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

      // Do we have a start date and need an end date
      // AND is this date is after our start date?
      const useAsEndDate =
        (range.start && !range.end) &&
        date >= range.start;

      const newRange = useAsEndDate
        // Set as end. Keep rest.
        ? {...range, end: date}
        // Clear end/hover. Set as start
        : {start: date};

      this.setState({range: newRange});
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

export { selectRange };

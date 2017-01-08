import React, { PropTypes } from 'react';
import { compose } from '../../utils/utils';
import withProps from '../withProps';
import Day from '../Day/Day';
import { selectRangeDay } from '../Day/selectRangeDay';

/**
 * Higher Order Component to add "select range" feature
 * @param {Component} Component
 * @return {SelectRangeCalendar}
 */
export function selectRange(Component) {
  class SelectRangeCalendar extends React.Component {
    constructor() {
      super(...arguments);

      this.DayComponent = compose([
        withProps((props) => ({
          range: {
            ...this.props.range,
            hoverDate: this.state.hoverDate,
          },
          onClick: () => this.handleClickDate(props.date),
          onMouseEnter: () => this.handleMouseEnterDate(props.date),
        })),
        selectRangeDay,
      ])(this.props.DayComponent);

      this.state = {
        hoverDate: undefined,
      };
    }

    componentDidUpdate(prevProps) {
      // "React to state change"
      if (prevProps.range.end && !this.props.range.end) {
        this.setState({hoverDate: undefined});
      }
    }

    /**
     * @param {Date} date
     */
    handleClickDate(date) {
      const {range} = this.props;

      const useAsEndDate =
        // Do we have a start date and need an end date
        (range.start && !range.end) &&
        // AND is this date is after our start date?
        date >= range.start;

      this.props.setRange(
        useAsEndDate
          // Keep start. Set as end.
          ? {start: range.start, end: date}
          // Set as start. Clear end.
          : {start: date, end: undefined}
      );
    }

    /**
     * @param {Date} date
     */
    handleMouseEnterDate(date) {
      const {range} = this.props;
      if (range.start && !range.end) {
        this.setState({hoverDate: date});
      }
    }

    render() {
      return (
        <Component {...this.props} DayComponent={this.DayComponent} />
      );
    }
  }

  SelectRangeCalendar.propTypes = {
    range: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }).isRequired,
    setRange: PropTypes.func.isRequired,
  };

  SelectRangeCalendar.defaultProps = {
    DayComponent: Day,
  };

  return SelectRangeCalendar;
}

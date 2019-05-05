import PropTypes from 'prop-types';
import React from 'react';
import { flowRight as compose } from 'lodash';
import withProps from '../withProps';
import Day from '../Day/Day';
import EnhanceDay from './EnhanceDay';
import { selectRangeDay } from '../Day/selectRangeDay';

/**
 * Higher Order Component to add "select range" feature
 * @param {Component} CalendarComponent
 * @return {SelectRangeCalendar}
 */
export function selectRange(CalendarComponent) {
  class SelectRangeCalendar extends React.Component {
    constructor() {
      super(...arguments);

      this.enhanceDay = compose([
        withProps((props) => ({
          range: {
            ...this.props.range,
            hoverDate: this.state.hoverDate,
          },
          handleClickDate: this.handleClickDate,
          handleMouseEnterDate: this.handleMouseEnterDate,
        })),
        selectRangeDay,
      ]);

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
    handleClickDate = (date) => {
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
    handleMouseEnterDate = (date) => {
      const {range} = this.props;
      if (range.start && !range.end) {
        this.setState({hoverDate: date});
      }
    }

    render() {
      return (
        <EnhanceDay
          DayComponent={this.props.DayComponent}
          enhanceDay={this.enhanceDay}
        >
          {(EnhancedDay) => <CalendarComponent {...this.props} DayComponent={EnhancedDay} />}
        </EnhanceDay>
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

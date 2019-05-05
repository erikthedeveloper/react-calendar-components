import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import Day from '../Day/Day';
import EnhanceDay from './EnhanceDay';
import { indicatorDay } from '../Day/indicatorDay';
import { isSameDay } from '../../utils/date-utils';

/**
 * Higher Order Component to add "day indicators" feature to Calendar
 * @param {Component} CalendarComponent
 * @return {IndicatorCalendar}
 */
export function indicators(CalendarComponent) {
  class IndicatorCalendar extends Component {
    constructor() {
      super(...arguments);

      this.enhanceDay = compose([
        // 02 - Provide the enhanced DayComponent with required props
        this.withIndicatorProps.bind(this),
        // 01 - Enhance the DayComponent to enable indicators
        indicatorDay,
      ]);
    }

    withIndicatorProps(DayComponent) {
      const WithIndicatorProps = (props) => (
        <DayComponent
          {...props}
          hasIndicator={this.props.events.some(
            (event) => isSameDay(event.date, props.date)
          )}
        />
      );

      return WithIndicatorProps;
    }

    render() {
      return (
        <EnhanceDay
          DayComponent={this.props.DayComponent}
          enhanceDay={this.enhanceDay}
        >
          {(EnhancedDay) => <CalendarComponent {...this.props} DayComponent={EnhancedDay} />}
        </EnhanceDay>
      )
    }
  }

  IndicatorCalendar.defaultProps = {
    DayComponent: Day,
  };

  IndicatorCalendar.propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.instanceOf(Date).isRequired,
      })
    ).isRequired,
  };

  return IndicatorCalendar;
}

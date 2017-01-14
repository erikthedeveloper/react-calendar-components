import React, { PropTypes, Component } from 'react';
import { flowRight as compose, memoize } from 'lodash';
import Day from '../Day/Day';
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

      // This ensures we only enhance once per props.DayComponent
      // and avoid unnecessarily enhancing on every render
      this.enhanceDayComponent = memoize(this.enhanceDayComponent.bind(this));
    }

    /**
     * @param {Component} DayComponent
     * @return {Component} The enhanced DayComponent
     */
    enhanceDayComponent(DayComponent) {
      const hasIndicator = (date) => this.props.events.some(
        (event) => isSameDay(event.date, date)
      );

      return compose([
        // 02 - Provide the enhanced DayComponent with
        // the required hasIndicator(Date):bool function
        (DayComponent) => (props) => (
          <DayComponent {...props} hasIndicator={hasIndicator} />
        ),

        // 01 - Enhance the DayComponent to enable indicators
        indicatorDay,
      ])(DayComponent);
    }

    render() {
      const enhancedDayComponent = this.enhanceDayComponent(this.props.DayComponent);
      return <CalendarComponent {...this.props} DayComponent={enhancedDayComponent} />
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

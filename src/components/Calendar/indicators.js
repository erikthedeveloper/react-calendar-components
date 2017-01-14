import React, { PropTypes } from 'react';
import { compose } from '../../utils/utils';
import Day from '../Day/Day';
import { indicatorDay } from '../Day/indicatorDay';
import { isSameDay } from '../../utils/date-utils';

/**
 * Higher Order Component to add "day indicators" feature
 * @param {Component} Component
 * @return {IndicatorCalendar}
 */
export function indicators(Component) {
  class IndicatorCalendar extends React.Component {
    constructor() {
      super(...arguments);

      const hasIndicator = (date) => this.props.events.some(
        (event) => isSameDay(event.date, date)
      );

      // The enhanced props.DayComponent
      this.DayComponent = compose([
        // 02 - Provide the enhanced DayComponent with
        // the required hasIndicator(Date):bool function
        (DayComponent) => (props) => (
          <DayComponent {...props} hasIndicator={hasIndicator} />
        ),

        // 01 - Enhance the DayComponent
        indicatorDay,
      ])(this.props.DayComponent);
    }

    render() {
      return <Component {...this.props} DayComponent={this.DayComponent} />
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

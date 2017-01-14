import React, { PropTypes, Component } from 'react';
import { compose } from '../../utils/utils';
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

      this.state = {
        // Create enhancedDayComponent and store in state.
        enhancedDayComponent: this.enhanceDayComponent(this.props.DayComponent),
      };
    }

    componentDidUpdate(prevProps) {
      // We don't want to create this on every render, but we also want
      // to account for the fact that props.DayComponent could change
      // We only want to re-create if props.DayComponent changed.
      // Treat this as a "computed property".
      if (prevProps.DayComponent !== this.props.DayComponent) {
        const enhancedDayComponent = this.enhanceDayComponent(this.props.DayComponent);
        this.setState({enhancedDayComponent});
      }
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
      return <CalendarComponent {...this.props} DayComponent={this.state.enhancedDayComponent} />
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

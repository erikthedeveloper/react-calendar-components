import React, { PropTypes } from 'react';
import { compose } from '../../utils/utils';
import Day from '../Day';
import withProps from '../withProps';
import { indicatorDay } from './indicatorDay';
import {isSameDay} from '../../utils/date-utils';

const dateHasEvent =
  (date, events) => events.some(
    (event) => isSameDay(event.date, date)
  );

/**
 * Higher Order Component to add "day indicators" feature
 * @param {Component} Component
 * @return {IndicatorCalendar}
 */
export function indicators(Component) {
  class IndicatorCalendar extends React.Component {
    constructor() {
      super(...arguments);

      this.DayComponent = compose([
        withProps((props) => ({
          hasIndicator: dateHasEvent(props.date, this.props.events),
        })),
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

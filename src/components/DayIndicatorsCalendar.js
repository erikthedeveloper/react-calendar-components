import React, { PropTypes } from 'react';
import Calendar from './Calendar';
import withProps from './withProps';
import IndicatorDay from './IndicatorDay';
import {isSameDay} from '../utils/date-utils';

const dateHasEvent =
  (date, events) => events.some(
    (event) => isSameDay(event.date, date)
  );

export default class DayIndicatorsCalendar extends React.Component {
  constructor() {
    super(...arguments);

    this.DayComponent = withProps((props) => ({
      hasIndicator: dateHasEvent(props.date, this.props.events),
    }))(IndicatorDay);
  }

  render() {
    return <Calendar {...this.props} DayComponent={this.DayComponent} />
  }
}

DayIndicatorsCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};

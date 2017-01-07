import React, { PropTypes } from 'react';
import { compose } from '../../utils/utils';
import Calendar from '../Calendar';
import withProps from '../withProps';
import Day from '../Day';
import { selectDateDay } from './selectDateDay';

/**
 * Higher Order Component to add "select date" feature
 * @param {Component} Component
 * @return {SelectDateCalendar}
 */
function selectDate(Component) {

  class SelectDateCalendar extends React.Component {
    constructor() {
      super(...arguments);

      this.displayName =
        `SelectDateCalendar(${Component.displayName || Component.name})`;

      this.DayComponent = compose([
        withProps(() => ({
          selectedDate: this.props.selectedDate,
          selectDate: this.props.selectDate,
        })),
        selectDateDay,
      ])(this.props.DayComponent);
    }

    render() {
      return (
        <Component {...this.props} DayComponent={this.DayComponent} />
      );
    }
  }

  SelectDateCalendar.defaultProps = {
    DayComponent: Day,
  };

  SelectDateCalendar.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    selectDate: PropTypes.func.isRequired,
  };

  return SelectDateCalendar;
}

export default selectDate(Calendar);
export { selectDate };

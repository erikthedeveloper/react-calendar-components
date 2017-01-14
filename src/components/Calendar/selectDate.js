import React, { PropTypes } from 'react';
import { flowRight as compose } from 'lodash';
import withProps from '../withProps';
import Day from '../Day/Day';
import { selectDateDay } from '../Day/selectDateDay';

/**
 * Higher Order Component to add "select date" feature
 * @param {Component} Component
 * @return {SelectDateCalendar}
 */
export function selectDate(Component) {

  class SelectDateCalendar extends React.Component {
    constructor() {
      super(...arguments);

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

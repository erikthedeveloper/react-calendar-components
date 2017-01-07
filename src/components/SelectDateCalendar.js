import React, { PropTypes } from 'react';
import Calendar from './Calendar';
import withProps from './withProps';
import SelectDateDay from './SelectDateDay';

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

      this.DayComponent = withProps(() => ({
        selectedDate: this.props.selectedDate,
        selectDate: this.props.selectDate,
      }))(this.props.DayComponent);
    }

    render() {
      return (
        <Component {...this.props} DayComponent={this.DayComponent} />
      );
    }
  }

  SelectDateCalendar.defaultProps = {
    DayComponent: SelectDateDay,
  };

  SelectDateCalendar.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    selectDate: PropTypes.func.isRequired,
  };

  return SelectDateCalendar;
}

export default selectDate(Calendar);
export { selectDate };

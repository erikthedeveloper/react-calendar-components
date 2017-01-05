import React, { PropTypes } from 'react';
import Calendar from './Calendar';
import withProps from './withProps';
import SelectDateDay from './SelectDateDay';

export default class SelectDateCalendar extends React.Component {
  constructor() {
    super(...arguments);

    this.DayComponent = withProps(() => ({
      selectedDate: this.props.selectedDate,
      selectDate: this.props.selectDate,
    }))(SelectDateDay);
  }

  render() {
    return (
      <Calendar {...this.props} DayComponent={this.DayComponent} />
    );
  }
}

SelectDateCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  selectDate: PropTypes.func.isRequired,
};

import React, { PropTypes } from 'react';
import Calendar from './Calendar';
import withProps from './withProps';
import SelectDateDay from './SelectDateDay';

export default class SelectDateCalendar extends React.Component {
  constructor() {
    super(...arguments);

    this.selectDate = this.selectDate.bind(this);

    this.DayComponent = withProps(() => ({
      selectedDate: this.state.selectedDate,
      selectDate: this.selectDate,
    }))(SelectDateDay);

    this.state = {
      selectedDate: undefined,
    };
  }

  /**
   * @param {Date|undefined} selectedDate
   */
  selectDate(selectedDate) {
    this.setState({selectedDate});
  }

  render() {
    return (
      <Calendar {...this.props} DayComponent={this.DayComponent} />
    );
  }
}

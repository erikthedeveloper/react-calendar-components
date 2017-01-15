import React, { PropTypes } from 'react';
import { flowRight as compose } from 'lodash';
import Day from '../Day/Day';
import EnhanceDay from './EnhanceDay';
import { isSameDay } from '../../utils/date-utils';
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

      this.enhanceDay = compose([
        this.withSelectDateProps.bind(this),
        selectDateDay,
      ]);
    }

    withSelectDateProps(DayComponent) {
      const WithSelectDateProps = (props) => (
        <DayComponent
          {...props}
          selectDate={this.props.selectDate}
          selected={(
            this.props.selectedDate &&
            isSameDay(props.date, this.props.selectedDate)
          )}
        />
      );

      return WithSelectDateProps;
    }

    render() {
      return (
        <EnhanceDay
          DayComponent={this.props.DayComponent}
          enhanceDay={this.enhanceDay}
        >
          {(EnhancedDay) => <Component {...this.props} DayComponent={EnhancedDay} />}
        </EnhanceDay>
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

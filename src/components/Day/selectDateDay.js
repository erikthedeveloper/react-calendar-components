import React, { PropTypes } from 'react';
import { isSameDay } from '../../utils/date-utils';

export function selectDateDay(Component) {
  const SelectDateDay = (props) => {
    const additionalProps = {
      selected: (
        props.selectedDate &&
        isSameDay(props.date, props.selectedDate)
      ),
      onClick: () => props.selectDate(props.date),
    };

    return <Component {...props} {...additionalProps} />;
  };

  SelectDateDay.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    selectDate: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date),
  };

  return SelectDateDay;
}

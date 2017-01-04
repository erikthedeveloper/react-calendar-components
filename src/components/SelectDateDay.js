import React, { PropTypes } from 'react';
import { isSameDay } from '../utils/date-utils';
import Day from './Day';

const SelectDateDay = (props) => {
  const additionalProps = {
    selected: (
      props.selectedDate &&
      isSameDay(props.date, props.selectedDate)
    ),
    onClick: () => props.selectDate(props.date),
  };

  return <Day {...props} {...additionalProps} />;
};

SelectDateDay.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  selectDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

export default SelectDateDay;

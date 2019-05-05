import PropTypes from 'prop-types';
import React from 'react';

export function selectDateDay(DayComponent) {
  const SelectDateDay = (props) => {
    const {selectDate, selected, ...otherProps} = props;

    const enhancedProps = {
      ...otherProps,
      selected,
      onClick: () => selectDate(props.date),
    };

    return <DayComponent {...enhancedProps} />;
  };

  SelectDateDay.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    selectDate: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  };

  return SelectDateDay;
}

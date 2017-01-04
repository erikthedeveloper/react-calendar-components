import React, { PropTypes } from 'react';
import Day from './Day';

const IndicatorDay = (props) => {
  return (
    <Day {...props}>
      {props.hasIndicator && (
        <span className="Day__indicator" />
      )}
    </Day>
  );
};

IndicatorDay.propTypes = {
  hasIndicator: PropTypes.bool,
};

export default IndicatorDay;

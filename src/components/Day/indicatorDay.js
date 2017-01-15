import React, { PropTypes } from 'react';

export function indicatorDay(DayComponent) {
  const IndicatorDay = (props) => {
    return (
      <DayComponent {...props}>
        {props.children}
        {props.hasIndicator && (
          <span className="Day__indicator" />
        )}
      </DayComponent>
    );
  };

  IndicatorDay.propTypes = {
    hasIndicator: PropTypes.bool.isRequired,
  };

  return IndicatorDay;
}

import React, { PropTypes } from 'react';

export function indicatorDay(Component) {
  const IndicatorDay = (props) => {
    return (
      <Component {...props}>
        {props.children}
        {props.hasIndicator && (
          <span className="Day__indicator" />
        )}
      </Component>
    );
  };

  IndicatorDay.propTypes = {
    hasIndicator: PropTypes.bool,
  };

  return IndicatorDay;
}

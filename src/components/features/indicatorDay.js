import React, { PropTypes } from 'react';

function indicatorDay(Component) {
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

  IndicatorDay.displayName =
    `IndicatorDay(${Component.displayName || Component.name})`;

  IndicatorDay.propTypes = {
    hasIndicator: PropTypes.bool,
  };

  return IndicatorDay;
}

export { indicatorDay };

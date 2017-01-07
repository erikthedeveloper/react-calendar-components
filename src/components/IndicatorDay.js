import React, { PropTypes } from 'react';

function indicatorDay(Component) {
  const IndicatorDay = (props) => {
    if (props.date.getDate() === 10) {
      console.log('indicator');
    }
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

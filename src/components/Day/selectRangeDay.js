import React, { PropTypes } from 'react';
import { isInRange, isSameDay } from '../../utils/date-utils';

const rangeBarClassName = (date, range) => {
  let className = 'Day__range-bar';
  if (range.start && isSameDay(date, range.start)) {
    className += ' Day__range-bar--start';
  }
  if (range.end && isSameDay(date, range.end)) {
    className += ' Day__range-bar--end';
  }

  return className;
};

export function selectRangeDay(Component) {
  const RangeDay = (props) => {
    const {start, end, hoverDate} = props.range;

    const displayRangeBar = isInRange(
      props.date,
      start,
      end || hoverDate || start
    );

    return (
      <Component
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        {...props}
      >
        {props.children}
        {displayRangeBar && (
          <span className={rangeBarClassName(props.date, props.range)} />
        )}
      </Component>
    );
  };

  return RangeDay;
}

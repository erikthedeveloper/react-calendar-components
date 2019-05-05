import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import {isInRange, isSameDay} from '../../utils/date-utils';

export function selectRangeDay(Component) {
  const RangeDay = props => {
    const {start, end, hoverDate} = props.range;

    const displayRangeBar = isInRange(
      props.date,
      start,
      end || hoverDate || start
    );

    const barClassName = classnames('Day__range-bar', {
      'Day__range-bar--start': start && isSameDay(props.date, start),
      'Day__range-bar--end': end && isSameDay(props.date, end),
    });

    return (
      <Component
        onClick={() => props.handleClickDate(props.date)}
        onMouseEnter={() => props.handleMouseEnterDate(props.date)}
        {...props}
      >
        {props.children}
        {displayRangeBar && <span className={barClassName} />}
      </Component>
    );
  };

  RangeDay.propTypes = {
    range: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
      hoverDate: PropTypes.instanceOf(Date),
    }).isRequired,
    handleClickDate: PropTypes.func.isRequired,
    handleMouseEnterDate: PropTypes.func.isRequired,
  };

  return RangeDay;
}

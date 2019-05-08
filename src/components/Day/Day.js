import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import './Day.css';
import {WEEKDAYS, MONTHS} from '../../utils/date-utils';

/**
 * Date -> "29, Monday April 2019"
 * @param {Date} date
 */
const dateToLabel = date =>
  [
    date.getDate(),
    [WEEKDAYS[date.getDay()], MONTHS[date.getMonth()], date.getFullYear()].join(
      ' '
    ),
  ].join(', ');

const Day = props => {
  // Whitelist props to be spread onto the top level div
  const otherProps = {
    onClick: props.disabled ? undefined : props.onClick,
    onMouseEnter: props.onMouseEnter,
  };

  const className = classnames('Day', {
    'Day--disabled': props.disabled,
    'Day--today': props.today,
    'Day--selected': props.selected,
  });

  return (
    <button
      {...otherProps}
      type="button"
      className={className}
      aria-label={dateToLabel(props.date)}
      aria-pressed={props.selected}
      aria-disabled={props.disabled}
    >
      <div className="Day__date">{props.date.getDate()}</div>
      <div className="Day__content">{props.children}</div>
    </button>
  );
};

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  today: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Day;

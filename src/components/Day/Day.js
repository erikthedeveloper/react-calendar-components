import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import './Day.css';

const Day = props => {
  // Whitelist props to be spread onto the top level div
  const otherProps = {
    onClick: props.onClick,
    onMouseEnter: props.onMouseEnter,
  };

  const className = classnames('Day', {
    'Day--disabled': props.disabled,
    'Day--today': props.today,
    'Day--selected': props.selected,
  });

  return (
    <div {...otherProps} className={className}>
      <div className="Day__date">{props.date.getDate()}</div>
      <div className="Day__content">{props.children}</div>
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  today: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Day;

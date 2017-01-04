import React, { PropTypes } from 'react';
import './Day.css';

function getDayClassName(props) {
  let className = 'Day';
  if (props.disabled)
    className += ' Day--disabled';
  if (props.today)
    className += ' Day--today';
  if (props.selected)
    className += ' Day--selected';
  return className
}

const Day = (props) => {
  // Whitelist props to be spread onto the top level div
  const otherProps = {
    onClick: props.onClick,
  };

  return (
    <div {...otherProps} className={getDayClassName(props)}>
      <div className="Day__date">
        {props.date.getDate()}
      </div>
      {props.children}
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  today: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Day;

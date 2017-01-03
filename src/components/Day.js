import React, { PropTypes } from 'react';
import './Day.css';

function getDayClassName(props) {
  let className = 'Day';
  if (props.disabled)
    className += ' Day--disabled';
  if (props.today)
    className += ' Day--today';
  return className
}

const Day = (props) => (
  <div className={getDayClassName(props)}>
    <div className="Day__date">
      {props.date.getDate()}
    </div>
  </div>
);

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  today: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Day;

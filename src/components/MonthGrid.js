import PropTypes from 'prop-types';
import React from 'react';
import { chunk } from 'lodash';
import './MonthGrid.css';

const MonthGrid = (props) => {
  return (
    <div className="MonthGrid">
      {chunk(props.children, 7).map((childrenChunk, i) => (
        <div className="MonthGrid__row" key={i}>
          {childrenChunk.map((child, j) => (
            <div className="MonthGrid__item" key={`${i}_${j}`}>
              <div className="MonthGrid__item__height" />
              <div className="MonthGrid__item__content">
                {child}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

MonthGrid.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MonthGrid;

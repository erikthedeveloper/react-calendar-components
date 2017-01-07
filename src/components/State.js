import React, { PropTypes } from 'react';

class State extends React.Component {
  constructor() {
    super(...arguments);
    this.state = this.props.initialState;
    this.stateSetters = this.props.stateSetters(this.setState.bind(this));
  }

  render() {
    return this.props.children({...this.state, ...this.stateSetters});
  }
}

State.propTypes = {
  children: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  /* stateSetters = (setState) => ({
    setFoo: (foo) => setState({foo}),
    // ...
  }) */
  stateSetters: PropTypes.func.isRequired,
};

/**
 * Merge multiple [{initialState, stateSetters}, ...]
 * @param stateProps
 * @return {{initialState, stateSetters}}
 */
const mergeStateProps = (stateProps) => stateProps.reduce(
  (merged, props) => ({
    initialState: {
      ...merged.initialState,
      ...props.initialState,
    },
    stateSetters: (setState) => ({
      ...merged.stateSetters(setState),
      ...props.stateSetters(setState),
    }),
  })
);

const MergedState = ({stateProps, children}) => (
  <State {...mergeStateProps(stateProps)} children={children} />
);

MergedState.propTypes = {
  stateProps: PropTypes.arrayOf(PropTypes.shape({
    initialState: State.propTypes.initialState,
    stateSetters: State.propTypes.stateSetters,
  }))
};

export default State;
export { MergedState };

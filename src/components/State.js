import PropTypes from 'prop-types';
import React from 'react';

/**
 * Render callback component to house state.
 *  Useful for feeding stateless components with state
 *  Example: in Storybook stories (see src/stories/)
 *
 * @example
 * <State
 *   initialState={{count: 1}}
 *   stateSetters={(setState) => ({
 *     setCount: (count) => setState({count}),
 *   })}
 * >
 *   {(stateProps) => (
 *     <SomeComponent
 *       count={stateProps.count}
 *       setCount={stateProps.setCount}
 *     />
 *   )}
 * </State>
 */
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

const StoryState = ({stateProps, children}) => (
  <State {...mergeStateProps(stateProps)} children={children} />
);

StoryState.propTypes = {
  stateProps: PropTypes.arrayOf(PropTypes.shape({
    initialState: State.propTypes.initialState,
    stateSetters: State.propTypes.stateSetters,
  }))
};

export default State;
export { StoryState };

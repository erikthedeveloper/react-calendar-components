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

export default State;

import React, { PropTypes, Component } from 'react';

/**
 * Render callback component to enhance props (DayComponent)
 * and only invoke enhancer if/when DayComponent changes.
 *
 * We want to avoid creating this on every render, but we also want
 * to account for the fact that props.DayComponent could change.
 */
class EnhanceDay extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // Create EnhancedDay and store in state.
      EnhancedDay: this.props.enhanceDay(this.props.DayComponent),
    };
  }

  componentDidUpdate(prevProps) {
    // We only want to re-create this if props.DayComponent has changed.
    if (prevProps.DayComponent !== this.props.DayComponent) {
      this.setState({
        EnhancedDay: this.props.enhanceDay(this.props.DayComponent),
      })
    }
  }

  render() {
    // Invoke children with EnhancedDay Component
    return this.props.children(this.state.EnhancedDay);
  }
}

EnhanceDay.propTypes = {
  DayComponent: PropTypes.any.isRequired,
  enhanceDay: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default EnhanceDay;

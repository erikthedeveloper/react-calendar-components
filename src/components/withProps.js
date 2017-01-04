import React from 'react';

/**
 * Higher Order Component to allow enhancing a Component
 *  with additional props provided by getProps()
 *
 * @param {function(props: object): object} getProps
 * @return {function(Component): Component}
 */
const withProps = (getProps) => (Component) => {
  const WithProps = (props) => <Component {...props} {...getProps(props)} />;

  WithProps.displayName = `WithProps(${Component.displayName || Component.name})`;

  return WithProps;
};

export default withProps;

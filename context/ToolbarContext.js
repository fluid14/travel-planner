import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ToolbarStateContext = React.createContext();

export default function ToolbarStateProvider({ children }) {
  const [state, setState] = useState(false);

  const toggleState = () => {
    setState((prevState) => !prevState);
  };

  return (
    <ToolbarStateContext.Provider value={{ state, toggleState }}>
      {children}
    </ToolbarStateContext.Provider>
  );
}

ToolbarStateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const ToolbarStateConsumer = ({ children }) => (
  <ToolbarStateContext.Consumer>{children}</ToolbarStateContext.Consumer>
);

ToolbarStateConsumer.propTypes = {
  children: PropTypes.any.isRequired
};

export { ToolbarStateProvider, ToolbarStateConsumer, ToolbarStateContext };

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ConfirmModalContext = React.createContext('');

export default function ConfirmModalProvider({ children }) {
  const [state, setState] = useState(false);
  const [title, setTitle] = useState('');

  const hideModal = () => setState(false);
  let approveAction = null;

  const toggleState = (title = '', approve = () => {}, markerId) => {
    console.log('teraz');
    approveAction = () => approve(markerId);
    setTitle(title);
    setState((prevState) => !prevState);
  };

  return (
    <ConfirmModalContext.Provider
      value={{
        state,
        toggleState,
        approveAction,
        rejectAction: hideModal,
        title
      }}>
      {children}
    </ConfirmModalContext.Provider>
  );
}

ConfirmModalProvider.propTypes = {
  children: PropTypes.any.isRequired
};

const ConfirmModalConsumer = ({ children }) => (
  <ConfirmModalContext.Consumer>{children}</ConfirmModalContext.Consumer>
);

ConfirmModalConsumer.propTypes = {
  children: PropTypes.any.isRequired
};

export { ConfirmModalProvider, ConfirmModalConsumer, ConfirmModalContext };

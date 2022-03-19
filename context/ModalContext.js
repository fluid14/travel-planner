import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from '../components/AddPointModal/index.module.sass';

const ModalStateContext = React.createContext();

export default function ModalStateProvider({ children }) {
  const [state, setState] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const toggleState = (title = '', address = '') => {
    setState((prevState) => !prevState);
    setTitle(() => title);
    setAddress(() => address);
  };

  return (
    <ModalStateContext.Provider
      value={{
        state,
        toggleState,
        title,
        setTitle,
        address,
        setAddress,
        description,
        setDescription
      }}>
      {children}
    </ModalStateContext.Provider>
  );
}

ModalStateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const ModalStateConsumer = ({ children }) => (
  <ModalStateContext.Consumer>{children}</ModalStateContext.Consumer>
);

ModalStateConsumer.propTypes = {
  children: PropTypes.node.isRequired
};

export { ModalStateProvider, ModalStateConsumer };

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from '../components/AddPointModal/index.module.sass';

const ModalStateContext = React.createContext('');

export default function ModalStateProvider({ children }) {
  const [state, setState] = useState(false);
  const [pointData, setPointData] = useState({ title: '', address: '', position: '' });

  const toggleState = (e) => {
    setState((prevState) => !prevState);
    if (e) setPointData(() => JSON.parse(e.nativeEvent.srcElement.dataset.value));
  };

  return (
    <ModalStateContext.Provider
      value={{
        state,
        toggleState,
        pointData
      }}>
      {children}
    </ModalStateContext.Provider>
  );
}

ModalStateProvider.propTypes = {
  children: PropTypes.any.isRequired
};

const ModalStateConsumer = ({ children }) => (
  <ModalStateContext.Consumer>{children}</ModalStateContext.Consumer>
);

ModalStateConsumer.propTypes = {
  children: PropTypes.any.isRequired
};

export { ModalStateProvider, ModalStateConsumer, ModalStateContext };

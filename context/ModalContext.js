import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from '../components/AddPointModal/index.module.sass';

const ModalStateContext = React.createContext('');

export default function ModalStateProvider({ children }) {
  const [state, setState] = useState(false);
  const [pointData, setPointData] = useState({ title: '', address: '', position: '' });
  const [actionType, setActionType] = useState('new');

  const toggleState = (marker, edit = false) => {
    setState((prevState) => !prevState);
    setActionType(edit ? 'edit' : 'new');
    if (marker)
      setPointData(() => (edit ? marker : JSON.parse(marker.nativeEvent.srcElement.dataset.value)));
  };

  return (
    <ModalStateContext.Provider
      value={{
        state,
        toggleState,
        pointData,
        actionType,
        setActionType
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

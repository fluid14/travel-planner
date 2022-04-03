import cx from 'classnames';
import * as styles from '../AddPointModal/index.module.sass';
import { ConfirmModalConsumer } from '../../context/ConfirmModalContext';

const ConfirmModal = () => (
  <ConfirmModalConsumer>
    {({ state, toggleState, title, approveAction, rejectAction }) => (
      <div className={cx('modal', { [styles.show]: state })}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => toggleState(null)}
              />
            </div>
            <div className="modal-body d-flex flex-column">
              <button type="button" className="btn btn-primary mb-2" onClick={approveAction}>
                Tak
              </button>
              <button type="button" className="btn btn-danger" onClick={rejectAction}>
                Nie
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </ConfirmModalConsumer>
);

export default ConfirmModal;

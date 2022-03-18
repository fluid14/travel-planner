import { ToolbarStateConsumer } from '../../../context/ToolbarContext';
import cx from 'classnames';
import * as styles from './index.module.sass';

export default function ShowToolbarButton() {
  return (
    <ToolbarStateConsumer>
      {(toolbar) => (
        <button
          type="button"
          className={cx('btn', 'btn-primary', styles.btn)}
          onClick={toolbar.toggleState}>
          Punkty{toolbar.state}
        </button>
      )}
    </ToolbarStateConsumer>
  );
}

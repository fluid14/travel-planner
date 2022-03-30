import { ToolbarStateConsumer } from '../../../context/ToolbarContext';
import cx from 'classnames';
import * as styles from './index.module.sass';

export default function ShowToolbarButton({ children = 'Punkty', positionStatic = false }) {
  return (
    <ToolbarStateConsumer>
      {(toolbar) => (
        <button
          type="button"
          className={cx('btn', 'btn-primary', styles.btn, { [styles.static]: positionStatic })}
          onClick={toolbar.toggleState}>
          {children}
        </button>
      )}
    </ToolbarStateConsumer>
  );
}

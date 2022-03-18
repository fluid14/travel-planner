import * as styles from './index.module.sass';
import { ToolbarStateConsumer } from '../../context/ToolbarContext';
import cx from 'classnames';

export default function Toolbar() {
  return (
    <ToolbarStateConsumer>
      {(toolbar) => (
        <>
          <h1>test {toolbar.state}</h1>
          <div className={cx(styles.toolbarWrap, { [styles.active]: toolbar.state })}>
            <h1>toolbar</h1>
          </div>
        </>
      )}
    </ToolbarStateConsumer>
  );
}

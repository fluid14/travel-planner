import { Form, Formik } from 'formik';
import cx from 'classnames';
import * as styles from './index.module.sass';
import { ModalStateConsumer } from '../../context/ModalContext';

export default function AddPointModal() {
  return (
    <ModalStateConsumer>
      {({ state, toggleState, pointData }) => (
        <div className={cx('modal', { [styles.show]: state })}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Dodaj nowy punkt</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => toggleState(null)}
                />
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}>
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Tytuł
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={pointData.title}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Adres
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={pointData.address}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Opis
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          rows="5"
                          value=""
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary align-self-end">
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalStateConsumer>
  );
}

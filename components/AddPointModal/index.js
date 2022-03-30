import { Form, Formik } from 'formik';
import cx from 'classnames';
import * as styles from './index.module.sass';
import { ModalStateConsumer } from '../../context/ModalContext';
import { useContext } from 'react';
import { MarkersDataContext } from '../../context/MarkersDataContext';
import { TextEditor } from '../TextEditor';

export default function AddPointModal() {
  const { addNewMarker } = useContext(MarkersDataContext);
  const handleSubmit = async (values, setSubmitting, toggleState) => {
    toggleState();
    const payload = {
      ...values,
      ...values.position
    };

    delete payload.position;
    delete payload.map;
    delete payload.clickable;
    delete payload.visible;

    await addNewMarker(payload);
    setSubmitting(false);
  };
  return (
    <ModalStateConsumer>
      {({ state, toggleState, pointData }) => {
        return (
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
                    enableReinitialize={true}
                    initialValues={{
                      ...pointData,
                      description: '-',
                      reservationInfo: '-'
                    }}
                    onSubmit={async (values, { setSubmitting }) =>
                      handleSubmit(values, setSubmitting, toggleState)
                    }>
                    {({
                      isSubmitting,
                      setFieldValue,
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit
                    }) => (
                      <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label fw-bold">
                            Tytuł
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label fw-bold">
                            Adres
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label fw-bold">
                            Opis
                          </label>
                          <TextEditor
                            setFieldValue={(val) => setFieldValue('description', val)}
                            value={values.description}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label fw-bold">
                            Informacje o rezerwacji
                          </label>
                          <TextEditor
                            setFieldValue={(val) => setFieldValue('reservationInfo', val)}
                            value={values.reservationInfo}
                          />
                        </div>
                        <div className={cx(styles.buttonsWrap)}>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            Dodaj
                          </button>
                          <button
                            onClick={() => toggleState(null)}
                            type="reset"
                            className={cx(styles.btn, 'btn', 'btn-danger')}>
                            Anuluj
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ModalStateConsumer>
  );
}

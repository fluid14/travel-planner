import { Form, Formik } from 'formik';
import cx from 'classnames';
import * as styles from './index.module.sass';
import { ModalStateConsumer } from '../../context/ModalContext';
import { useContext, useEffect, useState } from 'react';
import { MarkersDataContext } from '../../context/MarkersDataContext';
import TextEditor from '../TextEditor';
import { ToolbarStateContext } from '../../context/ToolbarContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

export default function AddPointModal() {
  const { addNewMarker, editMarker } = useContext(MarkersDataContext);
  const { toggleState: toolbarToggleState } = useContext(ToolbarStateContext);
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleSubmit = async (values, setSubmitting, toggleState, setFieldValue, actionType) => {
    toggleState();
    const payload = {
      ...values,
      ...values.position
    };

    delete payload.position;
    delete payload.map;
    delete payload.clickable;
    delete payload.visible;

    (await actionType) === 'new'
      ? addNewMarker(payload)
      : editMarker(payload).then(() => toolbarToggleState());
    setSubmitting(false);
    setFieldValue(null);
  };
  return (
    <ModalStateConsumer>
      {({ state, toggleState, pointData, actionType }) => {
        return (
          <div className={cx('modal', { [styles.show]: state })}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {actionType === 'new' ? 'Dodaj lokalizacje' : 'Edytuj lokalizacje'}
                  </h5>
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
                      description: actionType === 'new' ? '-' : pointData.description,
                      reservationInfo: actionType === 'new' ? '-' : pointData.reservationInfo
                    }}
                    onSubmit={async (values, { setSubmitting, setFieldValue }) =>
                      handleSubmit(values, setSubmitting, toggleState, setFieldValue, actionType)
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
                            name="description"
                            onChange={(data) => setFieldValue('description', data)}
                            editorLoaded={editorLoaded}
                            value={values.description}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label fw-bold">
                            Informacje o rezerwacji
                          </label>
                          <TextEditor
                            name="reservationInfo"
                            onChange={(data) => setFieldValue('reservationInfo', data)}
                            editorLoaded={editorLoaded}
                            value={values.reservationInfo}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label fw-bold">
                            Planowana wizyta
                          </label>
                          <DatePicker
                            className="form-control"
                            selected={new Date(values.visitDate || new Date())}
                            dateFormat="dd.MM.yyyy"
                            locale="pl-PL"
                            onChange={(data) => setFieldValue('visitDate', data)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label fw-bold">
                            Kategoria
                          </label>
                          <select name="category" id="category" class="form-select">
                            <option value="attraction">Atrakcja</option>
                            <option value="food">Żarcie</option>
                          </select>
                        </div>
                        <div className={cx(styles.buttonsWrap)}>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {actionType === 'new' ? 'Dodaj' : 'Edytuj'}
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

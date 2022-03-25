import { Form, Formik } from 'formik';
import cx from 'classnames';
import * as styles from './index.module.sass';
import { ModalStateConsumer } from '../../context/ModalContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { MarkersDataContext } from '../../context/MarkersDataContext';

export default function AddPointModal() {
  const { setMarkersData } = useContext(MarkersDataContext);
  const handleSubmit = async (values, setSubmitting, toggleState) => {
    toggleState();
    const adding = toast.loading('Dodaje nowy punkt');
    const payload = {
      ...values,
      ...values.position
    };

    delete payload.position;
    delete payload.map;
    delete payload.clickable;
    delete payload.visible;

    await axios
      .post('/api/markers', payload)
      .then(() =>
        toast.update(adding, {
          render: 'Dodałeś pomyślnie nowy punkt',
          type: 'success',
          isLoading: false,
          autoClose: true,
          closeOnClick: true
        })
      )
      .then(() =>
        axios
          .get('/api/markers')
          .then((res) => res.data)
          .then(setMarkersData)
      )
      .catch((error) =>
        toast.update(adding, {
          render: `Coś poszło nie tak :( [${error}]`,
          type: 'error',
          isLoading: false
        })
      );
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
                      description: ''
                    }}
                    onSubmit={async (values, { setSubmitting }) =>
                      handleSubmit(values, setSubmitting, toggleState)
                    }>
                    {({ isSubmitting, values, handleChange, handleBlur, handleSubmit }) => (
                      <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
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
                          <label htmlFor="address" className="form-label">
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
                          <label htmlFor="description" className="form-label">
                            Opis
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="5"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
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

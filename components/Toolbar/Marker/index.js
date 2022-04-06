import cx from 'classnames';
import * as styles from './index.module.sass';
import { useContext } from 'react';
import { MarkersDataContext } from '../../../context/MarkersDataContext';
import { ModalStateContext } from '../../../context/ModalContext';
import { ToolbarStateConsumer } from '../../../context/ToolbarContext';
import moment from 'moment';
import 'moment/locale/pl';
import { ConfirmModalContext } from '../../../context/ConfirmModalContext';

const Marker = ({ marker, showMarker }) => {
  console.log(marker);
  const { removeMarker, setShowAllMarkers } = useContext(MarkersDataContext);
  const { toggleState } = useContext(ModalStateContext);
  const { toggleState: confirmModalState } = useContext(ConfirmModalContext);

  const updateMarker = (marker) => {
    document
      .getElementById('addMarkerButton')
      .setAttribute('data-value', JSON.stringify({ ...marker, map: null }));

    toggleState(marker, true);
  };

  return (
    <ToolbarStateConsumer>
      {({ toggleState }) => (
        <div
          key={marker.id}
          className={cx(
            { [styles.pass]: marker.pass, [styles.visited]: marker.visited },
            'accordion-item'
          )}>
          <h2 className={cx(styles.header, 'accordion-header')} id={`selector-${marker.id}`}>
            <button
              className={cx('accordion-button', styles.accordionButton)}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${marker.id}`}
              aria-expanded="true"
              aria-controls={`collapse-${marker.id}`}>
              {marker.title}
            </button>
          </h2>
          <div
            id={`collapse-${marker.id}`}
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#points">
            <div className={cx(styles.body, 'accordion-body')}>
              {marker.address && (
                <p className={cx(styles.info)}>
                  <span>Adres:</span> {marker.address}
                </p>
              )}
              {marker.rating && marker.totalRatings && (
                <p className={cx(styles.info)}>
                  <span>Oceny:</span> {marker.rating}
                  <span className={cx(styles.mini)}>/{marker.totalRatings}</span>
                </p>
              )}
              {marker.priceLevel && (
                <p className={cx(styles.info, styles.infoPriceLevel)}>
                  <span>Poziom cenowy </span>
                  <span
                    className={cx(styles.priceLevel, {
                      [styles.free]: marker.priceLevel === 0,
                      [styles.inexpensive]: marker.priceLevel === 1,
                      [styles.moderate]: marker.priceLevel === 2,
                      [styles.expensive]: marker.priceLevel === 3,
                      [styles.veryExpensive]: marker.priceLevel === 4
                    })}
                  />
                </p>
              )}
              {marker.description && (
                <>
                  <p className={cx(styles.info)}>
                    <span>Opis:</span>
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: marker.description }} />
                </>
              )}
              {marker.reservationInfo && (
                <>
                  <p className={cx(styles.info)}>
                    <span>Informacje o rezerwacji:</span>
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: marker.reservationInfo }} />
                </>
              )}
              {marker.visitDate && (
                <>
                  <p className={cx(styles.info)}>
                    <span>Planowana wizyta:</span>
                    {`${moment(marker.visitDate).locale('pl').format('dddd')} ${moment(
                      marker.visitDate
                    ).format('DD.MM.YYYY')}`}
                  </p>
                </>
              )}
              {marker.neededTime && (
                <p className={cx(styles.info)}>
                  <span>Potrzebny czas:</span> {marker.neededTime}
                </p>
              )}
              <div className={cx(styles.buttons)}>
                <button
                  onClick={() => {
                    showMarker(marker, setShowAllMarkers);
                    toggleState();
                  }}
                  className={cx(styles.btn, 'btn btn-primary')}
                  type="button">
                  Pokaż
                </button>
                <a
                  href={`https://maps.google.com/?ll=${marker.lat},${marker.lng}`}
                  target="_blank"
                  className={cx(styles.btn, 'btn btn-secondary')}>
                  Google Maps
                </a>
                <button
                  onClick={() => {
                    updateMarker(marker);
                    toggleState();
                  }}
                  className={cx(styles.btn, 'btn btn-primary')}
                  type="button">
                  Edytuj
                </button>
                <button
                  onClick={() => {
                    removeMarker(marker.recordId);
                    // confirmModalState('Czy na pewno chcesz usunąć?', removeMarker, marker.recordId);
                    toggleState();
                  }}
                  className={cx(styles.btn, 'btn btn-danger')}
                  type="button">
                  Usuń
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolbarStateConsumer>
  );
};

export default Marker;

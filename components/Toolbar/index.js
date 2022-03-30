import * as styles from './index.module.sass';
import { ToolbarStateConsumer } from '../../context/ToolbarContext';
import cx from 'classnames';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { MarkersDataContext } from '../../context/MarkersDataContext';

export default function Toolbar({ showMarker, showAllMarkers: showAllMarkersOnMap }) {
  const {
    markersData,
    setMarkersData,
    getMarkers,
    removeMarker,
    showAllMarkers,
    setShowAllMarkers
  } = useContext(MarkersDataContext);

  useEffect(() => {
    getMarkers();
  }, [axios, setMarkersData]);

  return (
    <ToolbarStateConsumer>
      {(toolbar) => (
        <>
          <div className={cx(styles.toolbarWrap, { [styles.active]: toolbar.state })}>
            <div className="d-flex justify-content-end mb-2">
              <button
                type="button"
                onClick={() => showAllMarkersOnMap(showAllMarkers, setShowAllMarkers, markersData)}
                className="btn btn-primary">
                {!showAllMarkers ? 'Pokaż wszystkie' : 'Ukryj wszystkie'}
              </button>
            </div>
            <div className={cx(styles.pointsWrap, 'accordion')} id="points">
              {markersData?.map((marker) => (
                <div key={marker.id} className={cx(styles.bar, 'accordion-item')}>
                  <h2
                    className={cx(styles.header, 'accordion-header')}
                    id={`selector-${marker.id}`}>
                    <button
                      className="accordion-button"
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
                      {marker.description && (
                        <>
                          <p className={cx(styles.info)}>
                            <span>Informacje o rezerwacji:</span>
                          </p>
                          <div dangerouslySetInnerHTML={{ __html: marker.reservationInfo }} />
                        </>
                      )}
                      <div className={cx(styles.buttons)}>
                        <button
                          onClick={() => showMarker(marker, setShowAllMarkers)}
                          className={cx(styles.btn, 'btn btn-primary')}
                          type="button">
                          Pokaż
                        </button>
                        <a
                          href={`https://www.google.com/maps/place/?q=place_id:${marker?.placeId}`}
                          target="_blank"
                          className={cx(styles.btn, 'btn btn-primary')}>
                          Pokaż w Google Maps
                        </a>
                        <button
                          onClick={() => removeMarker(marker.recordId)}
                          className={cx(styles.btn, 'btn btn-danger')}
                          type="button">
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </ToolbarStateConsumer>
  );
}

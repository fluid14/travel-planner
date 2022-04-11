import * as styles from './index.module.sass';
import { ToolbarStateConsumer } from '../../context/ToolbarContext';
import cx from 'classnames';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { MarkersDataContext } from '../../context/MarkersDataContext';
import ShowToolbarButton from './ShowToolbarButton';
import moment from 'moment';
import Marker from './Marker';
import 'moment/locale/pl.js';

export default function Toolbar({ showMarker, showAllMarkers: showAllMarkersOnMap }) {
  const [searchState, setSearchState] = useState();
  const {
    markersData,
    markersDataGrouped,
    setMarkersData,
    getMarkers,
    showAllMarkers,
    setShowAllMarkers,
    sortByDate,
    sortByVisited,
    markersByDate,
    markersByVisited,
    removeSort
  } = useContext(MarkersDataContext);

  const [markersBySearch, setMarkersBySearch] = useState(null);

  const changeSearch = (value) => {
    setSearchState(value);
    setMarkersBySearch(
      markersData.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))
    );
  };

  useEffect(() => {
    getMarkers();
  }, [axios, setMarkersData]);

  return (
    <ToolbarStateConsumer>
      {({ state, toggleState }) => (
        <>
          <div className={cx(styles.toolbarWrap, { [styles.active]: state })}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <ShowToolbarButton positionStatic>Schowaj</ShowToolbarButton>
              <div className="d-flex flex-column">
                <button
                  type="button"
                  onClick={() => {
                    showAllMarkersOnMap(showAllMarkers, setShowAllMarkers, markersData);
                    toggleState();
                  }}
                  className="btn btn-primary mb-2">
                  {!showAllMarkers ? 'Pokaż wszystkie' : 'Ukryj wszystkie'}
                </button>
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={() => (!markersByDate ? sortByDate() : removeSort())}>
                  {!markersByDate ? 'Posortuj według dat' : 'Usuń sortowanie'}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => (!markersByVisited ? sortByVisited() : removeSort())}>
                  {!markersByVisited ? 'Posortuj odwiedzone' : 'Usuń sortowanie'}
                </button>
              </div>
            </div>
            <div className={cx(styles.pointsWrap, 'accordion')} id="points">
              {!markersByDate && !markersByVisited && (
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Szukaj"
                  value={searchState}
                  onChange={(e) => changeSearch(e.target.value)}
                />
              )}
              {!markersByDate &&
                !markersBySearch &&
                !markersByVisited &&
                markersDataGrouped?.attraction &&
                markersDataGrouped?.attraction.length > 0 && (
                  <div
                    className={cx(
                      styles.dataHeader,
                      'd-flex justify-content-between align-items-end'
                    )}>
                    <p className={cx(styles.dateTitle)}>Atrakcje</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        showAllMarkersOnMap(
                          showAllMarkers,
                          setShowAllMarkers,
                          markersDataGrouped.attraction,
                          true
                        );
                        toggleState();
                      }}>
                      Pokaż na mapie
                    </button>
                  </div>
                )}
              {!markersByDate &&
                !markersBySearch &&
                !markersByVisited &&
                markersDataGrouped?.attraction &&
                markersDataGrouped?.attraction.map((marker) => (
                  <Marker
                    key={marker.id}
                    marker={marker}
                    showMarker={showMarker}
                    toggleState={toggleState}
                  />
                ))}
              {!markersByDate &&
                !markersBySearch &&
                !markersByVisited &&
                markersDataGrouped?.food &&
                markersDataGrouped?.food.length > 0 && (
                  <div
                    className={cx(
                      styles.dataHeader,
                      'd-flex justify-content-between align-items-end'
                    )}>
                    <p className={cx(styles.dateTitle)}>Jedzenie</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        showAllMarkersOnMap(
                          showAllMarkers,
                          setShowAllMarkers,
                          markersDataGrouped.food,
                          true
                        );
                        toggleState();
                      }}>
                      Pokaż na mapie
                    </button>
                  </div>
                )}
              {!markersByDate &&
                !markersBySearch &&
                !markersByVisited &&
                markersDataGrouped?.food &&
                markersDataGrouped?.food.map((marker) => (
                  <Marker
                    key={marker.id}
                    marker={marker}
                    showMarker={showMarker}
                    toggleState={toggleState}
                  />
                ))}

              {!markersByDate &&
                !markersByVisited &&
                markersBySearch &&
                markersBySearch?.map((marker) => {
                  return (
                    <Marker
                      key={marker.id}
                      marker={marker}
                      showMarker={showMarker}
                      toggleState={toggleState}
                    />
                  );
                })}
              {markersByDate &&
                markersByDate?.map((markers) => {
                  return (
                    <div key={markers.date}>
                      <div
                        className={cx(
                          styles.dataHeader,
                          'd-flex justify-content-between align-items-end'
                        )}>
                        <p
                          className={cx(styles.dateTitle, {
                            [styles.today]: markers.date === moment(new Date()).format('DD.MM.YYYY')
                          })}>
                          {markers.date === 'undefined'
                            ? 'Nie przydzielono'
                            : `${markers.date} ${moment(markers.date).locale('pl').format('dddd')}`}
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            showAllMarkersOnMap(
                              showAllMarkers,
                              setShowAllMarkers,
                              markers.value,
                              true
                            );
                            toggleState();
                          }}>
                          Pokaż na mapie
                        </button>
                      </div>
                      {markers.value.map((marker) => (
                        <Marker
                          key={marker.id}
                          marker={marker}
                          showMarker={showMarker}
                          toggleState={toggleState}
                        />
                      ))}
                    </div>
                  );
                })}
              {markersByVisited &&
                markersByVisited?.map((markers) => {
                  return (
                    <div key={markers.title}>
                      <div
                        className={cx(
                          styles.dataHeader,
                          'd-flex justify-content-between align-items-end'
                        )}>
                        <p className={cx(styles.dateTitle)}>{markers.title}</p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            showAllMarkersOnMap(
                              showAllMarkers,
                              setShowAllMarkers,
                              markers.value,
                              true
                            );
                            toggleState();
                          }}>
                          Pokaż na mapie
                        </button>
                      </div>
                      {markers.value.map((marker) => (
                        <Marker
                          key={marker.id}
                          marker={marker}
                          showMarker={showMarker}
                          toggleState={toggleState}
                        />
                      ))}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </ToolbarStateConsumer>
  );
}

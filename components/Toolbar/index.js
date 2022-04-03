import * as styles from './index.module.sass';
import { ToolbarStateConsumer } from '../../context/ToolbarContext';
import cx from 'classnames';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { MarkersDataContext } from '../../context/MarkersDataContext';
import ShowToolbarButton from './ShowToolbarButton';
import moment from 'moment';
import { removeDuplicateFromArray } from '../../utils';
import Marker from './Marker';
import 'moment/locale/pl.js';

export default function Toolbar({ showMarker, showAllMarkers: showAllMarkersOnMap }) {
  const { markersData, setMarkersData, getMarkers, showAllMarkers, setShowAllMarkers } =
    useContext(MarkersDataContext);

  const [markersByDate, setMarkersByDate] = useState(null);

  useEffect(() => {
    getMarkers();
  }, [axios, setMarkersData]);

  const sortByDate = () => {
    const sortByDateTemp = { undefined: [] };
    markersData.forEach(({ visitDate }) => {
      const groupDate = visitDate ? moment(visitDate).format('DD.MM.YYYY') : 'Nie określono';

      markersData.forEach((marker) => {
        const markerDate = marker.visitDate ? moment(marker.visitDate).format('DD.MM.YYYY') : null;

        if (!sortByDateTemp[groupDate] && groupDate === markerDate) {
          Object.assign(sortByDateTemp, { [groupDate]: [] });
          if (groupDate) {
            sortByDateTemp[groupDate].push(marker);
            sortByDateTemp[groupDate] = removeDuplicateFromArray(sortByDateTemp[groupDate]);
          }
        } else if (sortByDateTemp[groupDate] && groupDate === markerDate) {
          sortByDateTemp[groupDate].push(marker);
          sortByDateTemp[groupDate] = removeDuplicateFromArray(sortByDateTemp[groupDate]);
        } else if (!markerDate) {
          sortByDateTemp.undefined.push(marker);
          sortByDateTemp.undefined = removeDuplicateFromArray(sortByDateTemp.undefined);
        }
      });
    });

    let temp = [];
    for (const [key, value] of Object.entries(sortByDateTemp)) {
      temp.push({ date: key, value });
    }

    temp.sort((a, b) => moment(b.date) - moment(a.date)).reverse();
    setMarkersByDate(temp);
  };

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
                <button type="button" className="btn btn-primary" onClick={sortByDate}>
                  Posortuj według dat
                </button>
              </div>
            </div>
            <div className={cx(styles.pointsWrap, 'accordion')} id="points">
              {!markersByDate &&
                markersData?.map((marker) => {
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
                      <p
                        className={cx(styles.dateTitle, {
                          [styles.today]: markers.date === moment(new Date()).format('DD.MM.YYYY')
                        })}>
                        {`${markers.date} ${moment(markers.date).locale('pl').format('dddd')}`}
                      </p>
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

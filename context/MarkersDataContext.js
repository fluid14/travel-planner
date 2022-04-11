import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToolbarStateContext } from './ToolbarContext';
import moment from 'moment';
import { removeDuplicateFromArray } from '../utils';

const MarkersDataContext = createContext(null);

const MarkersDataContextProvider = ({ children }) => {
  const [markersData, setMarkersData] = useState();
  const [markersDataGrouped, setMarkersDataGrouped] = useState();
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  const [markersByDate, setMarkersByDate] = useState(null);
  const [markersByVisited, setMarkersByVisited] = useState(null);

  const getMarkers = () => {
    const getList = toast.loading('Pobieram listę punktów');
    return axios
      .get('/api/markers')
      .then((res) => res.data)
      .then((res) => {
        setMarkersData(res);
        const food = res.filter((marker) => marker.category === 'food');
        const attraction = res.filter((marker) => marker.category === 'attraction');
        setMarkersDataGrouped({ food, attraction });
      })
      .finally(() =>
        toast.update(getList, {
          render: 'Pobrano punkty!',
          type: 'success',
          isLoading: false,
          autoClose: true,
          closeOnClick: true
        })
      );
  };

  const removeMarker = (id) => {
    return axios
      .delete('/api/markers', { params: { id } })
      .then(() => toast.success('Usunięto lokalizacje!'))
      .catch((error) =>
        toast.error(error, {
          autoClose: true,
          closeOnClick: true
        })
      )
      .finally(() => getMarkers());
  };

  const editMarker = (payload) => {
    const edit = toast.loading('Edytuje punkt');
    return axios
      .put('/api/markers', { ...payload })
      .then(() =>
        toast.update(edit, {
          render: 'Zedytowałeś punkt!',
          type: 'success',
          isLoading: false,
          autoClose: true,
          closeOnClick: true
        })
      )
      .catch((error) =>
        toast.error(error, {
          autoClose: true,
          closeOnClick: true
        })
      )
      .finally(() => getMarkers());
  };

  const addNewMarker = (payload) => {
    const adding = toast.loading('Dodaje nowy punkt');
    return axios
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
      .catch((error) =>
        toast.update(adding, {
          render: `Coś poszło nie tak :( [${error}]`,
          type: 'error',
          isLoading: false,
          autoClose: true,
          closeOnClick: true
        })
      )
      .finally(() => getMarkers());
  };

  const sortByDate = () => {
    removeSort();
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

  const sortByVisited = () => {
    removeSort();
    const sortByVisitedTemp = { Odwiedzone: [], 'Nie odwiedzone': [] };
    markersData.forEach((marker) => {
      if (marker.visited) sortByVisitedTemp['Odwiedzone'].push(marker);
      if (!marker.visited) sortByVisitedTemp['Nie odwiedzone'].push(marker);
    });

    let temp = [];
    for (const [key, value] of Object.entries(sortByVisitedTemp)) {
      temp.push({ title: key, value });
    }

    setMarkersByVisited(temp);
  };

  const removeSort = () => {
    setMarkersByDate(null);
    setMarkersByVisited(null);
  };

  return (
    <MarkersDataContext.Provider
      value={{
        markersData,
        markersDataGrouped,
        setMarkersData,
        getMarkers,
        removeMarker,
        editMarker,
        addNewMarker,
        showAllMarkers,
        setShowAllMarkers,
        markersByDate,
        markersByVisited,
        sortByDate,
        sortByVisited,
        removeSort
      }}>
      {children}
    </MarkersDataContext.Provider>
  );
};

export { MarkersDataContext, MarkersDataContextProvider };

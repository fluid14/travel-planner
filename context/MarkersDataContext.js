import { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MarkersDataContext = createContext(null);

const MarkersDataContextProvider = ({ children }) => {
  const [markersData, setMarkersData] = useState();
  const [showAllMarkers, setShowAllMarkers] = useState(false);

  const getMarkers = () => {
    const getList = toast.loading('Pobieram listę punktów');
    return axios
      .get('/api/markers')
      .then((res) => res.data)
      .then(setMarkersData)
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
    return axios
      .put('/api/markers', { ...payload })
      .then(() => toast.success('Zaktualizowano lokalizacje!'))
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

  return (
    <MarkersDataContext.Provider
      value={{
        markersData,
        setMarkersData,
        getMarkers,
        removeMarker,
        editMarker,
        addNewMarker,
        showAllMarkers,
        setShowAllMarkers
      }}>
      {children}
    </MarkersDataContext.Provider>
  );
};

export { MarkersDataContext, MarkersDataContextProvider };

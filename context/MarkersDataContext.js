import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MarkersDataContext = createContext(null);

const MarkersDataContextProvider = ({ children }) => {
  const [markersData, setMarkersData] = useState();

  const getMarkers = () => {
    const getList = toast.loading('Pobieram listę punktów');
    axios
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

  return (
    <MarkersDataContext.Provider value={{ markersData, setMarkersData, getMarkers }}>
      {children}
    </MarkersDataContext.Provider>
  );
};

export { MarkersDataContext, MarkersDataContextProvider };

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const MarkersDataContext = createContext(null);

const MarkersDataContextProvider = ({ children }) => {
  const [markersData, setMarkersData] = useState();

  const getMarkers = () =>
    axios
      .get('/api/markers')
      .then((res) => res.data)
      .then(setMarkersData);

  return (
    <MarkersDataContext.Provider value={{ markersData, setMarkersData, getMarkers }}>
      {children}
    </MarkersDataContext.Provider>
  );
};

export { MarkersDataContext, MarkersDataContextProvider };

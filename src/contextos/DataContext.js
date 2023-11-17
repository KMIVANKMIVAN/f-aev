// DataContext.js
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [datoscontratoData, setDatoscontratoData] = useState([]); // Define el estado inicial

  const updateDatoscontratoData = (data) => {
    setDatoscontratoData(data);
  };

  return (
    <DataContext.Provider value={{ datoscontratoData, updateDatoscontratoData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

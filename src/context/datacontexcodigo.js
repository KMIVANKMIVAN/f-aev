import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [datoscontratoData, setDatoscontratoData] = useState([]);

  const updateDatosContratoData = (newData) => {
    setDatoscontratoData(newData);
  };

  return (
    <DataContext.Provider
      value={{ datoscontratoData, updateDatosContratoData }}
    >
      {children}
    </DataContext.Provider>
  );
}

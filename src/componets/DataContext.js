import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [nombrePdf, setNombrePdf] = useState("");

  const obtenerDatosFindAllOne = async (nombrePdf) => {
    // Aquí coloca tu lógica para obtener datos usando axios, etc.
    // ...

    console.log("Obtener datos para", nombrePdf);
  };

  return (
    <DataContext.Provider value={{ obtenerDatosFindAllOne, setNombrePdf }}>
      {children}
    </DataContext.Provider>
  );
};

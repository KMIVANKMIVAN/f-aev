// api.js
"use client";
import axios from "axios";
import { obtenerToken } from "../utils/auth";

const obtenerDatosFindAllOne = async (
  selectedContCod,
  setContcodComplejaData,
  setErrorContcodComplejaData
) => {
  try {
    if (selectedContCod) {
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/compleja/${selectedContCod}`;

      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        setContcodComplejaData(response.data);
      } else {
        setErrorContcodComplejaData(
          `Error en el estado de respuesta, estado: ${response.statusText}`
        );
      }
    }
  } catch (error) {
    setErrorContcodComplejaData(`Error del servidor: ${error}`);
  }
};

export { obtenerDatosFindAllOne };

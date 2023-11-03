"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { obtenerToken } from "../../../utils/auth";

const Prueba = () => {
  // Define un estado para almacenar los datos
  const [data, setData] = useState(null);

  /* useEffect(() => {
    // Realiza la solicitud HTTP cuando el componente se monta
    const fetchData = async () => {
      try {
        console.log("11111 entro");
        const url =
          "http://sitahu.aevivienda.gob.bo/ServicioWeb/vigente/4760619";
        const authorizationToken =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9rZXkiOjEsImluc3RpdHV0aW9uIjoiQWdlbmNpYSBFc3RhdGFsIGRlIFZpdmllbmRhIiwic3lzdGVtIjoiVmlcdTAwZTF0aWNvcyIsImRhdGFjcmVhdGVkIjoxNjY4MTg1OTI2LCJkYXRlZmluaXNoZWQiOjAsIkFQSV9USU1FIjoxNjY4MTg1OTI2fQ.iMvwfyzUolxC_fpRjY606ZHNkWU0WlX4jyykCgv-Xus";

        const response = await fetch.get(url, {
          headers: {
            Authorization: authorizationToken,
          },
        });

        // Almacena los datos en el estado
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []); */

  useEffect(() => {
    // Realiza la solicitud HTTP cuando el componente se monta
    const fetchData = async () => {
      try {
        console.log("11111 entro");
        const url =
          "http://sitahu.aevivienda.gob.bo/ServicioWeb/verify/4760619";
        const authorizationToken =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9kZXZpY2VpbmciOjEsImluc3RpdHV0aW9uIjoiQWdlbmNpYSBFc3RhdGFsIGRlIFZpdmllbmRhIiwic3lzdGVtIjoiVmlcdTAwZTF0aWNvcyIsImRhdGFjcmVhdGVkIjoxNjY4MTg1OTI2LCJkYXRlZmluaXNoZWQiOjAsIkFQSV9USU1FIjoxNjY4MTg1OTI2fQ.iMvwfyzUolxC_fpRjY606ZHNkWU0WlX4jyykCgv-Xus";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Almacena los datos en el estado
          setData(data);
        } else {
          console.error(
            "Error al obtener datos. Código de estado:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
};

export default Prueba;

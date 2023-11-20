"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import { obtenerToken } from "../utils/auth";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import DatosComplViviend from "./datoscomplviviend";

const BuscarViviend = () => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [selectedContCod, setSelectedContCod] = useState(null);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setBuscar(value);
    setButtonDisabled(value.length <= 10); // Deshabilitar el botón si la longitud es menor o igual a 11 caracteres
  };

  const handleSearch = async () => {
    console.log("Realizando la solicitud GET con valores:", buscar);
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/buscar/${buscar}`;
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        console.log("hola0");
        console.log(response.data);
        setDatoscontratoData(response.data);
        setSelectedContCod(0);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  return (
    <>
      <h2 className="p-3 text-mi-color-terceario text-2xl font-bold">Buscar</h2>
      <div className="col-span-1 flex justify-center px-10">
        <TextField
          name="codigo"
          helperText="Ejemplo: AEV-LP-0000 o FASE(XIII)..."
          id="standard-basic"
          label="Codigo de Proyecto (COMPLETO) o Nombre de Proyecto:"
          variant="standard"
          className={`w-full ${
            buscar.length < 11 ? "text-red-500" : "text-green-500"
          }`}
          value={buscar}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-center pt-5">
        <Button
          variant="outlined"
          onClick={handleSearch}
          // disabled={buttonDisabled}
        >
          <span className="mr-2">Buscar</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
      </div>
      <br />
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {datoscontratoData.map((data, index) => (
            <div key={index}>
              <Card
                elevation={24}
                sx={{
                  minWidth: 275,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundImage: 'url("/casa2.jpg")',
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    opacity: 0.2,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Generacion Instruccion de Desembolso Vivienda Nueva
                  </Typography>
                  <Typography variant="h5" component="div">
                    CODIGO: {data.proy_cod}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    PROYECTO: {data.cont_des}
                  </Typography>
                  <Typography variant="body2">
                    MONTO CONTRATO Bs. {data.montocontrato}
                    <br />
                    EMPRESA: {data.inst_des}
                    <br />
                    ULTIMA BOLETA: {data.bole_fechav}
                    <br />
                    ESTADO SAP: {data.etap_cod}
                    <br />
                    DEPARTAMENTO: {data.depa_des}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={(event) => {
                      setSelectedContCod(data.cont_cod);
                    }}
                    size="small"
                  >
                    Seleccionar
                  </Button>
                </CardActions>
              </Card>
              <br />
            </div>
          ))}
        </div>
      </div>
      <DatosComplViviend selectedContCod={selectedContCod} />
    </>
  );
};

export default BuscarViviend;

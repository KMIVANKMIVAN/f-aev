"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { obtenerToken } from "../utils/auth";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

import { SubirBajarEliminarPdf } from "./SubirBajarEliminarPdf";

function formatearNumero(numero) {
  // Verificar si el número es decimal
  const esDecimal = numero % 1 !== 0;

  // Si es un número decimal, formatear con separadores de miles y coma para decimales
  if (esDecimal) {
    const partes = numero.toFixed(2).split(".");
    const parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${parteEntera},${partes[1]}`;
  }

  // Si es un número entero, formatear solo con separadores de miles
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const DatosComplViviend = ({ selectedContCod }) => {
  const [contcodComplejaData, setContcodComplejaData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});

  const [errorcontcodComplejaData, setErrorContcodComplejaData] = useState([]);

  console.log("me llego este codigo de contrato:", selectedContCod);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedContCod) {
        try {
          const token = obtenerToken();
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/compleja/${selectedContCod}`;

          const response = await axios.get(url, { headers });

          if (response.status === 200) {
            console.log("Datos recibidos:", response.data);
            setContcodComplejaData(response.data);
          } else {
            console.error("Error al obtener los datos 1:", response.statusText);
            setErrorContcodComplejaData(
              `Error en el estado de respues, estado: ${response.statusText}`
            );
          }
        } catch (error) {
          console.error("Error al obtener los datos 2:", error);
          setErrorContcodComplejaData(`Error del servidor: ${error}`);
        }
      }
    };

    fetchData();
  }, [selectedContCod]);

  if (contcodComplejaData.length === 0 || selectedContCod === 0) {
    console.log("no hay datos 1");
    return null;
  }

  const handleExpandClick = (index) => {
    setExpandedItems({
      ...expandedItems,
      [index]: !expandedItems[index],
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <p className="text-c1p text-2xl font-bold">
          PROYECTO: {contcodComplejaData[0]?.objeto}
        </p>
        <br />
        <p className="text-c1p text-2xl font-bold">
          CODIGO: {contcodComplejaData[0]?.proy_cod}
        </p>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {contcodComplejaData.map((data, index) => (
            <div key={index}>
              <Card
                elevation={24}
                sx={{
                  // minWidth: 280,
                  height: "100%", // Ajustar la altura al 100% del contenedor padre
                  width: "100%", // Ajustar el ancho al 100% del contenedor padre
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundImage: 'url("/casa3.jpg")',
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    opacity: 0.2,
                  },
                }}
              >
                <CardContent>
                  <div className="grid grid-cols-2">
                    <div>
                      <h2 className="text-center text-mi-color-primario">
                        {" "}
                        <strong>PDF AEV</strong>
                      </h2>
                      <SubirBajarEliminarPdf
                        nombrepdf={data.iddesem + "-AEV"}
                      />
                      <h2 className="text-center text-mi-color-primario">
                        {" "}
                        <strong>ANEXOS AEV</strong>
                      </h2>
                      <SubirBajarEliminarPdf
                        nombrepdf={data.iddesem + "-ANEXOS"}
                      />
                    </div>
                    <div>
                      <h2 className="text-center text-blue-500">
                        <strong>PDF BUSA</strong>
                      </h2>
                      <SubirBajarEliminarPdf
                        nombrepdf={data.iddesem + "-BUSA"}
                      />
                    </div>
                  </div>
                  <Typography variant="body2">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div>
                        {data.iddesem && (
                          <>
                            <strong className="text-mi-color-secundario">
                              ID:
                            </strong>{" "}
                            {data.iddesem}
                            <br />
                          </>
                        )}
                      </div>
                      <div>
                        <strong className="text-mi-color-secundario">
                          MULTA:
                        </strong>{" "}
                        {formatearNumero(data.multa)}
                        <br />
                      </div>
                    </div>
                    <strong className="text-mi-color-secundario">
                      MONTO FISICO:
                    </strong>{" "}
                    {formatearNumero(data.monto_fisico)}
                    <br />
                    {data.monto_desembolsado && (
                      <>
                        <strong className="text-mi-color-secundario">
                          MONTO DESEMBOLSADO:
                        </strong>{" "}
                        {formatearNumero(data.monto_desembolsado)}
                      </>
                    )}
                    <br />
                    {data.detalle && (
                      <>
                        <strong className="text-mi-color-secundario">
                          TIPO PLANILLA:
                        </strong>{" "}
                        {data.detalle}
                      </> //RELACIONAR A TABLA TIPO PLANILLA
                    )}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ display: "flex" }}>
                  <ExpandMore
                    expand={expandedItems[index] || false}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expandedItems[index] || false}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expandedItems[index] || false}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <Typography variant="body2">
                      {data.fechabanco && (
                        <>
                          <strong className="text-mi-color-secundario">
                            FECHA ENVIO AL BANCO:
                          </strong>{" "}
                          {data.fechabanco}
                          <br />
                        </>
                      )}
                      {data.fecha_generado && (
                        <>
                          <strong className="text-mi-color-secundario">
                            FECHA INICIO PLANILLA:
                          </strong>{" "}
                          {data.fecha_generado}
                          <br />
                        </>
                      )}
                      {data.fecha_abono && (
                        <>
                          <strong className="text-mi-color-secundario">
                            FECHA DE ABONO:
                          </strong>{" "}
                          {data.fecha_abono}
                          <br />
                        </>
                      )}
                      {data.numero_factura && (
                        <>
                          <strong className="text-mi-color-secundario">
                            NUMERO DE FACTURA:
                          </strong>{" "}
                          {data.numero_factura}
                          <br />
                        </>
                      )}
                      {data.observaciones_pago && (
                        <>
                          <strong className="text-mi-color-secundario">
                            OBSERVACIONES DE PAGO:
                          </strong>{" "}
                          {data.observaciones_pago}
                        </>
                      )}
                      {data.archivo && (
                        <>
                          <strong className="text-mi-color-secundario">
                            NOMBRE DEL ARCHIVO PDF:
                          </strong>{" "}
                          {data.archivo}
                        </>
                      )}
                      {data.numero_inst && (
                        <>
                          <strong className="text-mi-color-secundario">
                            NUMERO DE INSTRUCTIVO:
                          </strong>{" "}
                          {data.numero_inst}
                          <br />
                        </>
                      )}
                      {data.titular && (
                        <>
                          <strong className="text-mi-color-secundario">
                            TITULAR:
                          </strong>{" "}
                          {data.titular}
                          <br />
                        </> ///RELACIONAR CON EL NUMERO DE CUENTA Y TUTULAR
                      )}
                      {data.cuentatitular && (
                        <>
                          <strong className="text-mi-color-secundario">
                            CUENTA DEL TITULAR:
                          </strong>{" "}
                          {data.cuentatitular}
                          <br />
                        </> ///RELACIONAR CON EL NUMERO DE CUENTA Y TUTULAR
                      )}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DatosComplViviend;

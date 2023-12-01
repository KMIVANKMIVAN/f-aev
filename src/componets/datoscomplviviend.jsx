"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { obtenerToken } from "../utils/auth";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Button from "@mui/material/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { BajarEliminarAnexos } from "./BajarEliminarAnexos";

import { SubirBajarEliminarPdf } from "./SubirBajarEliminarPdf";
import { AnexsosPdf } from "./AnexsosPdf";

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

  const [respuestaFindallone, setRespuestaFindallone] = useState(null);
  const [errorRespuestaFindallone, setErrorRespuestaFindallone] =
    useState(null);

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
    obtenerDatosFindAllOne();
  };

  const obtenerDatosFindAllOne = async () => {
    try {
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/respaldodesembolsos/findallone/57246`;
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/respaldodesembolsos/findallone/${contcodComplejaData[0]?.iddesem}`;

      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        console.log("Datos recibidos:", response.data);
        setRespuestaFindallone(response.data);
        setErrorRespuestaFindallone(null);
      } else {
        console.error("Error al obtener los datos:", response.statusText);
        setErrorRespuestaFindallone(
          `Error en el estado de respuesta, estado: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setErrorRespuestaFindallone(`Error del servidor: ${error}`);
    }
  };

  const handleExpandClick2 = (index) => {
    // Resto del código
    obtenerDatosFindAllOne();
  };

  const refrescarDatos = () => {
    obtenerDatosFindAllOne();
  };

  console.log("111");
  console.log("respuestaFindallone:", respuestaFindallone);
  let totalMulta = 0;
  let totalDescuentoAntiReten = 0;
  let totalMontoFisico = 0;
  let totalMontoDesembolsado = 0;
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <p className="text-c1p text-1xl font-bold">
          PROYECTO: {contcodComplejaData[0]?.objeto}
        </p>
        <br />
        <p className="text-c1p text-1xl font-bold">
          CODIGO: {contcodComplejaData[0]?.proy_cod}
        </p>
        <br />
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          {contcodComplejaData.map((data, dataIndex) => (
            <div key={dataIndex} style={{ marginBottom: "20px" }}>
              <Card>
                <CardContent>
                  <div style={{ overflowX: "auto", maxWidth: "100%" }}>
                    <div
                      className="text-xs grid grid-cols-10"
                      style={{
                        gridTemplateColumns: "repeat(10, minmax(150px, 1fr))",
                        gap: "10px", // Ajusta el espaciado entre columnas
                      }}
                    >
                      <div className="border-r-2 border-b-slate-800">
                        <h2 className="text-center  text-mi-color-primario">
                          {" "}
                          <strong>INSTR. DESEN. AEV</strong>
                        </h2>
                        <SubirBajarEliminarPdf
                          nombrepdf={data.iddesem + "-AEV"}
                        />
                        <h2 className="text-center text-mi-color-primario">
                          {" "}
                          <strong>ANEXOS AEV</strong>
                        </h2>
                        <div className="pb-2 flex  justify-center items-center">
                          {/* <AnexsosPdf nombrepdf={data.iddesem} /> */}
                          <AnexsosPdf
                            nombrepdf={data.iddesem}
                            refrescarFunction={refrescarDatos}
                          />
                        </div>
                      </div>
                      <div className=" border-r-2 border-b-slate-800">
                        <h2 className="text-center text-blue-500">
                          <strong>INSTR. DESEN. BUSA</strong>
                        </h2>
                        <SubirBajarEliminarPdf
                          nombrepdf={data.iddesem + "-BUSA"}
                        />
                      </div>
                      <div className="text-center border-r-2 border-b-slate-800 ">
                        <strong>ANEXOS AEV</strong>
                        {errorRespuestaFindallone == null &&
                          respuestaFindallone && (
                            <>
                              <Button
                                endIcon={<AutorenewIcon size="large" />}
                                onClick={refrescarDatos}
                              >
                                Actualizar
                              </Button>
                              {respuestaFindallone.map((item, i) => (
                                <BajarEliminarAnexos
                                  key={i}
                                  nombrepdf={item.archivo}
                                  titulo={item.detalle}
                                  id={item.id}
                                  refrescarFunction={refrescarDatos}
                                />
                              ))}
                            </>
                          )}
                      </div>
                      <div className="px-1 border-r-2 border-b-slate-800">
                        <strong className="text-mi-color-secundario">
                          MULTA:
                        </strong>{" "}
                        {formatearNumero(data.multa)}
                      </div>
                      <div className="px-1 border-r-2 border-b-slate-800">
                        <strong className="text-mi-color-secundario">
                          DESCUENTO ANTICIPO:
                        </strong>
                        <br />
                        {formatearNumero(data.descuento_anti_reten)}
                      </div>
                      <div className="px-1 border-r-2 border-b-slate-800">
                        <strong className="text-mi-color-secundario">
                          MONTO FISICO:
                        </strong>
                        <br />
                        {formatearNumero(data.monto_fisico)}
                      </div>
                      <div className="px-1 border-r-2 border-b-slate-800">
                        {data.monto_desembolsado && (
                          <>
                            <strong className="text-mi-color-secundario">
                              MONTO DESEMBOLSADO:
                            </strong>
                            <br />
                            {formatearNumero(data.monto_desembolsado)}
                          </>
                        )}
                      </div>
                      <div className="px-1 border-r-2 border-b-slate-800">
                        {data.detalle && (
                          <>
                            <strong className="text-mi-color-secundario">
                              TIPO PLANILLA:
                            </strong>
                            <br />
                            {data.detalle}
                          </> //RELACIONAR A TABLA TIPO PLANILLA
                        )}
                      </div>
                      <div className="px-1 border-r-2 border-b-slate-800">
                        {data.iddesem && (
                          <>
                            <strong className="text-mi-color-secundario">
                              ID:
                            </strong>{" "}
                            {data.iddesem}
                            <br />
                          </>
                        )}
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
                          </>
                        )}
                      </div>
                      <div className="px-1">
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
                          </> ///RELACIONAR CON EL NUMERO DE CUENTA Y TUTULAR
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <Card>
          <CardContent>
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <div
                className="text-xs grid grid-cols-10"
                style={{
                  gridTemplateColumns: "repeat(10, minmax(150px, 1fr))",
                  gap: "10px", // Ajusta el espaciado entre columnas
                }}
              >
                <div className="pl-5">
                  <strong className=" text-mi-color-secundario">TOTAL </strong>
                </div>
                <div></div>
                <div className="px-1 border-r-2 border-b-slate-800"></div>
                <div className="px-1 border-r-2 border-b-slate-800">
                  <strong className=" text-mi-color-secundario">= </strong>
                  {contcodComplejaData.map((data, index) => {
                    totalMulta += data.multa;
                    totalDescuentoAntiReten += data.descuento_anti_reten;
                    totalMontoFisico += data.monto_fisico;
                    if (data.monto_desembolsado) {
                      totalMontoDesembolsado += data.monto_desembolsado;
                    }
                    return null;
                  })}
                  {formatearNumero(totalMulta)}
                </div>
                <div className="px-1 border-r-2 border-b-slate-800">
                  {/* Mostrar total de Descuento Anti Reten */}
                  <strong className="text-mi-color-secundario">= </strong>
                  {formatearNumero(totalDescuentoAntiReten)}
                </div>
                <div className="px-1 border-r-2 border-b-slate-800">
                  {/* Mostrar total de Monto Físico */}
                  <strong className="text-mi-color-secundario">= </strong>
                  {formatearNumero(totalMontoFisico)}
                </div>
                <div className="px-1 border-r-2 border-b-slate-800">
                  {/* Mostrar total de Monto Desembolsado */}
                  <strong className="text-mi-color-secundario">= </strong>
                  {formatearNumero(totalMontoDesembolsado)}
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DatosComplViviend;

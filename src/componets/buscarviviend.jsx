"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import { obtenerToken } from "../utils/auth";
import SubirPdf from "./subirpdf";
import BajarPdf from "./bajarpdf";

import Stack from "@mui/material/Stack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

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

const BuscarViviend = () => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [contcodData, setContcodData] = useState([]);
  const [contcodComplejaData, setContcodComplejaData] = useState([]);
  const [selectedContCod, setSelectedContCod] = useState(null);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [showUploadButton, setShowUploadButton] = useState(true);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [showSubirPdf, setShowSubirPdf] = useState(false);

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  console.log("datoscontratoData:");
  console.log(datoscontratoData);
  console.log("contcodComplejaData:");
  console.log(contcodComplejaData);

  const [expandedItems, setExpandedItems] = useState({});

  // Function to toggle the expanded state of a particular card
  const handleExpandClick = (index) => {
    setExpandedItems({
      ...expandedItems,
      [index]: !expandedItems[index],
    });
  };

  const handleUploadButtonClick = () => {
    setShowUploadButton(false);
    setShowDownloadButton(true);
  };

  const handleDownloadButtonClick = () => {
    setShowUploadButton(true);
    setShowDownloadButton(false);
  };

  const [serverError, setServerError] = useState("");

  const downloadFile = async (fileName) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/download/${fileName}`;
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, { headers });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setShowDownloadButton(false);
        setServerError(""); // Limpiar el mensaje de error si la descarga es exitosa
      } else {
        const errorText = await response.text(); // Obtener el mensaje de error del cuerpo de la respuesta
        setServerError(
          errorText || "Error desconocido al descargar el archivo"
        );
      }
    } catch (error) {
      setServerError("Error durante la descarga del archivo");
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setBuscar(value);
    setButtonDisabled(value.length <= 11); // Deshabilitar el botón si la longitud es menor o igual a 11 caracteres
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
        setDatoscontratoData(response.data);
        setIsDataLoaded(true);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData2 = async () => {
      if (selectedContCod) {
        try {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/contcod/${selectedContCod}`;
          const token = obtenerToken();

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(url, { headers });

          if (response.status === 200) {
            console.log("hola");
            console.log(response.data);
            setContcodData(response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData2();
  }, [selectedContCod]);

  useEffect(() => {
    const fetchData3 = async () => {
      if (contcodData.length > 0) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_BACKEND;
          const plocCodParams = contcodData
            .map((item) => `ploccod=${item.ploc_cod}`)
            .join("&");

          const url = `${baseUrl}/datoscontrato/compleja/${selectedContCod}/${contcodData[0].titr_cod}?${plocCodParams}`;

          const token = obtenerToken();

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(url, { headers });

          if (response.status === 200) {
            console.log("123");
            console.log(response.data);
            setContcodComplejaData(response.data);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    fetchData3();
  }, [contcodData]);

  const [errorDeletePdf, setErrorDeletePdf] = useState("");

  const deletePdf = async (partialName) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/delete/${partialName}`;

      const token = obtenerToken();

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(url, {
        headers,
      });

      if (response.status === 200) {
        console.log("PDF eliminado correctamente");
        setErrorDeletePdf("");
      } else {
        setErrorDeletePdf("Error al eliminar el PDF");
      }
    } catch (error) {
      setErrorDeletePdf(
        "El archivo solicitado no se elimino ¿Estás seguro de que el archivo ha sido subido?"
      );
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
            buscar.length < 12 ? "text-red-500" : "text-green-500"
          }`}
          value={buscar}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-center pt-5">
        <Button
          variant="outlined"
          onClick={handleSearch}
          disabled={buttonDisabled}
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
      <br />
      {contcodComplejaData.length > 0 && (
        <>
          <p className="text-c1p text-2xl font-bold">
            PROYECTO: {contcodComplejaData[0]?.objeto || ""}
          </p>
          <br />
          <p className="text-c1p text-2xl font-bold">
            CODIGO: {contcodComplejaData[0]?.proy_cod || ""}
          </p>
        </>
      )}
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {contcodComplejaData.map((data, index) => (
          <div key={index}>
            <Card
              elevation={24}
              sx={{
                minWidth: 280,
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& > *": {
                      m: 1,
                    },
                  }}
                >
                  {/* <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button
                      color="error"
                      size="small"
                      endIcon={<UploadFileIcon size="small" />}
                      onClick={() => {
                        setSelectedRow(data.iddesem);
                      }}
                    ></Button>
                    <Tooltip title="DESCARGAR" placement="top">
                      <Button
                        size="small"
                        // endIcon={<PictureAsPdfIcon size="small" />}
                        color="success"
                        endIcon={<SaveAltIcon size="small" />}
                        onClick={() =>
                          downloadFile(`${row.original.iddesem}-aev`)
                        }
                      ></Button>
                    </Tooltip>
                    <Button
                      size="small"
                      color="error"
                      endIcon={<DeleteRoundedIcon size="small" />}
                      onClick={() => deletePdf(`${row.original.iddesem}-aev`)}
                    ></Button>
                  </ButtonGroup> */}
                  <ButtonGroup variant="text" aria-label="text button group">
                    <Tooltip title="subir pdf" placement="left-end">
                      <Button
                        color="error"
                        size="small"
                        endIcon={<UploadFileIcon size="large" />}
                        onClick={() => {
                          setSelectedCardIndex(index);
                          setShowUploadDialog(true); // Abre el diálogo al hacer clic en el botón
                        }}
                      ></Button>
                      {selectedCardIndex === index && ( // Renderiza SubirPdf solo si el índice coincide
                        <SubirPdf nombreidpdf={data.iddesem + "-aev"} />
                      )}
                    </Tooltip>
                    <Tooltip title="descargar pdf" placement="top">
                      <Button
                        size="small"
                        color="success"
                        endIcon={<SaveAltIcon size="large" />}
                        onClick={() => downloadFile(`${data.iddesem}-aev`)}
                      ></Button>
                    </Tooltip>
                    <Tooltip title="eliminar pdf" placement="right-start">
                      <Button
                        size="small"
                        color="error"
                        endIcon={<DeleteRoundedIcon size="large" />}
                        onClick={() => deletePdf(`${data.iddesem}-aev`)}
                      ></Button>
                    </Tooltip>
                  </ButtonGroup>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                      {data.iddesem && (
                        <>
                          iddesem: {data.iddesem}
                          <br />
                        </>
                      )}
                      monto_fisico: {data.monto_fisico}
                      <br />
                      {data.monto_desembolsado && (
                        <>
                          monto_desembolsado: {data.monto_desembolsado}
                          <br />
                        </>
                      )}
                    </div>
                    <div>
                      {data.proyecto_id && (
                        <>
                          proyecto_id: {data.proyecto_id}
                          <br />
                        </>
                      )}
                      multa: {data.multa}
                      <br />
                      {data.tipo_planilla && (
                        <>
                          tipo_planilla: {data.tipo_planilla}
                          <br />
                        </>
                      )}
                    </div>
                  </div>
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
                  <Typography variant="body2" color="text.secondary">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div>
                        {data.checklist && (
                          <>
                            checklist: {data.checklist}
                            <br />
                          </>
                        )}
                        {data.estado && (
                          <>
                            estado: {data.estado}
                            <br />
                          </>
                        )}
                        {data.migrado_fecha_abono && (
                          <>
                            migrado_fecha_abono: {data.migrado_fecha_abono}
                            <br />
                          </>
                        )}
                        {data.etapa && (
                          <>
                            etapa: {data.etapa}
                            <br />
                          </>
                        )}
                        {data.fechabanco && (
                          <>
                            fechabanco: {data.fechabanco}
                            <br />
                          </>
                        )}
                        {data.fecha_update && (
                          <>
                            fecha_update: {data.fecha_update}
                            <br />
                          </>
                        )}
                        {data.fecha_generado && (
                          <>
                            fecha_generado: {data.fecha_generado}
                            <br />
                          </>
                        )}
                        {data.mes && (
                          <>
                            mes: {data.mes}
                            <br />
                          </>
                        )}
                        {data.id_pago && (
                          <>
                            id_pago: {data.id_pago}
                            <br />
                          </>
                        )}
                        {data.id_user_vobo && (
                          <>
                            id_user_vobo: {data.id_user_vobo}
                            <br />
                          </>
                        )}
                        {data.fecha_abono && (
                          <>
                            fecha_abono: {data.fecha_abono}
                            <br />
                          </>
                        )}
                        {data.cont_cod && (
                          <>
                            cont_cod: {data.cont_cod}
                            <br />
                          </>
                        )}
                        {data.ploc_cod && (
                          <>
                            ploc_cod: {data.ploc_cod}
                            <br />
                          </>
                        )}
                        {data.numero_factura && (
                          <>
                            numero_factura: {data.numero_factura}
                            <br />
                          </>
                        )}
                        {data.uh && (
                          <>
                            uh: {data.uh}
                            <br />
                          </>
                        )}
                        {data.cite && (
                          <>
                            cite: {data.cite}
                            <br />
                          </>
                        )}
                        open: {data.open}
                        <br />
                        {data.fecha_anulado && (
                          <>
                            fecha_anulado: {data.fecha_anulado}
                            <br />
                          </>
                        )}
                        {data.observaciones_pago && (
                          <>
                            observaciones_pago: {data.observaciones_pago}
                            <br />
                          </>
                        )}
                        {data.id_dpto && (
                          <>
                            id_dpto: {data.id_dpto}
                            <br />
                          </>
                        )}
                        {data.Observaciones_Sistemas && (
                          <>
                            Observaciones_Sistemas:{" "}
                            {data.Observaciones_Sistemas}
                            <br />
                          </>
                        )}
                      </div>
                      <div>
                        {data.idcuenta && (
                          <>
                            idcuenta: {data.idcuenta}
                            <br />
                          </>
                        )}
                        {data.fecha_insert && (
                          <>
                            fecha_insert: {data.fecha_insert}
                            <br />
                          </>
                        )}
                        {data.id && (
                          <>
                            id: {data.id}
                            <br />
                          </>
                        )}
                        {data.fechagenerado && (
                          <>
                            fechagenerado: {data.fechagenerado}
                            <br />
                          </>
                        )}
                        {data.monto_desembolsado && (
                          <>
                            monto_desembolsado: {data.monto_desembolsado}
                            <br />
                          </>
                        )}
                        {data.id_user && (
                          <>
                            id_user: {data.id_user}
                            <br />
                          </>
                        )}
                        {data.monto_contrato && (
                          <>
                            monto_contrato: {data.monto_contrato}
                            <br />
                          </>
                        )}
                        {data.gestion && (
                          <>
                            gestion: {data.gestion}
                            <br />
                          </>
                        )}
                        {data.fecha_banco && (
                          <>
                            fecha_banco: {data.fecha_banco}
                            <br />
                          </>
                        )}
                        {data.fecha_vobo && (
                          <>
                            fecha_vobo: {data.fecha_vobo}
                            <br />
                          </>
                        )}
                        {data.proy_cod && (
                          <>
                            proy_cod: {data.proy_cod}
                            <br />
                          </>
                        )}
                        {data.titr_cod && (
                          <>
                            titr_cod: {data.titr_cod}
                            <br />
                          </>
                        )}
                        {data.numero_inst && (
                          <>
                            numero_inst: {data.numero_inst}
                            <br />
                          </>
                        )}
                        {data.procesocontratacion && (
                          <>
                            procesocontratacion: {data.procesocontratacion}
                            <br />
                          </>
                        )}
                        {data.observacion && (
                          <>
                            observacion: {data.observacion}
                            <br />
                          </>
                        )}
                        {data.archivo && (
                          <>
                            archivo: {data.archivo}
                            <br />
                          </>
                        )}
                        {data.justificacion_anulacion && (
                          <>
                            justificacion_anulacion:{" "}
                            {data.justificacion_anulacion}
                            <br />
                          </>
                        )}
                        {data.id_user_anulacion && (
                          <>
                            id_user_anulacion: {data.id_user_anulacion}
                            <br />
                          </>
                        )}
                        {data.sigepro_id && (
                          <>
                            sigepro_id: {data.sigepro_id}
                            <br />
                          </>
                        )}
                        id_planilla: {data.id_planilla}
                        <br />
                        {data.activo && (
                          <>
                            activo: {data.activo}
                            <br />
                          </>
                        )}
                      </div>
                    </div>
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default BuscarViviend;

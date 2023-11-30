"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { obtenerToken } from "../utils/auth";
import { obtenerUserId } from "../utils/userdata";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { CompDialog } from "./CompDialog";

import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function SubirBajarEliminarAnexos({ iddesem, TipoResId, referencias }) {
  const [respuestas, setRespuestas] = useState(null);
  const [respuestasError, setErrorRespuestas] = useState(null);

  const [selecionarPDF, setSelecionarPDF] = useState(null);

  const [respuestaMessage, setRespuestaMessage] = useState(null);
  const [respuestaArchivo, setRespuestaArchivo] = useState(null);
  const [respuestaRespaldo, setRespuestaRespaldo] = useState(null);

  const userId = obtenerUserId();

  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const urlBase = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf`;

  const cargarElPDF = (event) => {
    setSelecionarPDF(event.target.files[0]);
    respuestasError(null);
    respuestaMessage(null); // Reiniciar el estado de respuestasError
  };

  const guardarPdf = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selecionarPDF); // Agrega el archivo seleccionado al FormData
      formData.append("id_user", userId);
      formData.append("tiporespaldo_id", TipoResId);
      formData.append("desembolsos_id", iddesem);
      formData.append("referencia", referencias);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/respaldodesembolsos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Importante para enviar archivos con FormData
          },
        }
      );

      // console.log("Respuesta del servidor:", response.data);
      // setRespuestas(response.data);
      console.log("Respuesta del servidor:", response.data);
      const { message, archivo, respaldo } = response.data; // Extraer los datos de la respuesta

      // Actualizar los estados con los datos obtenidos
      setRespuestaMessage(`RS: ${message}`);
      setRespuestaArchivo(archivo);
      setRespuestaRespaldo(respaldo);
    } catch (error) {
      let errorMessage = "Error al subir el archivo";
      if (error.response && error.response.data) {
        errorMessage = error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setErrorRespuestas(`RS: ${errorMessage}`);
      console.error("Error al subir el archivo:", error);
    }
  };

  const [abrirGuardar, setAbrirGuardar] = useState(false);

  const abrirGuardarPdf = () => {
    setAbrirGuardar(true);
  };

  const cerrarGuardarPdf = () => {
    setAbrirGuardar(false);
    setErrorRespuestas(null);
    setRespuestaMessage(null);
  };

  console.log("respuestaMessage:", respuestaMessage);
  console.log("respuestaArchivo:", respuestaArchivo);
  console.log("respuestaRespaldo:", respuestaRespaldo);

  return (
    <>
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
        <ButtonGroup variant="text" aria-label="text button group">
          <Tooltip title="Subir PDF" placement="left-end">
            <Button
              color="error"
              size="small"
              component="span"
              variant="outlined"
              endIcon={<UploadRoundedIcon size="large" />}
              onClick={abrirGuardarPdf}
            >
              Subir
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Box>
      <Dialog
        open={abrirGuardar}
        TransitionComponent={Transition}
        keepMounted
        onClose={cerrarGuardarPdf}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="text-center">
          {"Subir Instructivo PDF"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="flex justify-center items-center flex-col">
              <input
                className="block w-full text-sm bold text-mi-color-primario
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-mi-color-primario file:text-white
      hover:file:bg-mi-color-terceario"
                type="file"
                accept=".pdf"
                onChange={cargarElPDF}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        {respuestasError && (
          <p className="text-center m-2 text-red-500">{respuestasError}</p>
        )}
        {respuestaMessage && (
          <p className="text-center m-2 text-green-500">{respuestaMessage}</p>
        )}
        <DialogActions>
          <Button disabled={!selecionarPDF} onClick={guardarPdf}>
            Subir PDF
          </Button>
          <Button onClick={cerrarGuardarPdf}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

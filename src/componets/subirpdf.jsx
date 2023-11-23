"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { obtenerToken } from "../utils/auth";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SubirPdf = ({ nombreidpdf, openDialog, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const [errorSubirPdf, setErrorSubirPdf] = useState(null);

  const [pdfUrl, setPdfUrl] = useState(null);
  console.log("aver si llego el nombreidpdf", nombreidpdf);

  const [successMessage, setSuccessMessage] = useState(null);

  const [pdfFoundMessage, setPdfFoundMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/buscarpdf/${nombreidpdf}`,
          {
            headers: {
              Authorization: `Bearer ${obtenerToken()}`,
            },
          }
        );

        if (response.status === 200) {
          const pdfFound = response.data;
          console.log("lo que es en verdad responde", pdfFound);
          if (pdfFound) {
            setPdfFoundMessage(pdfFound);
          } else {
            setPdfFoundMessage(pdfFound);
          }
        }
      } catch (error) {
        console.error("Error al buscar el archivo PDF:", error);
        setPdfFoundMessage("Error al buscar el archivo PDF");
      }
    };

    if (nombreidpdf) {
      fetchData();
    }
  }, [nombreidpdf]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
    setErrorSubirPdf(null); // Reiniciar el mensaje de error
    setSuccessMessage(null);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("Debes seleccionar un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/upload/${nombreidpdf}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${obtenerToken()}`,
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const pdfBlob = response.data;
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfBlobUrl);

        const reader = new FileReader();
        reader.onload = function () {
          const successText = reader.result; // Contiene el mensaje de éxito como texto
          setSuccessMessage(successText);
        };
        reader.readAsText(pdfBlob);
      }
    } catch (error) {
      // setErrorSubirPdf(`Error: ${error.response.data}`);
      if (error.response && error.response.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
          const errorMessage = reader.result; // Contiene el mensaje de error como texto
          setErrorSubirPdf(`Error: ${errorMessage}`);
        };
        reader.readAsText(error.response.data);
      }
    }
  };

  // console.log("aaa", errorSubirPdf);
  // console.log("bbb", successMessage);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose(); // Llamar a la función onClose desde Prueba1 para actualizar el estado
  };

  React.useEffect(() => {
    handleClickOpen(); // Abre el Dialog cuando el componente se monta
  }, []);

  console.log("111 ", pdfFoundMessage);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {pdfFoundMessage ? (
            <h2 className="text-center text-red-500">
              YA SE SUBIÓ EL ARCHIVO PDF
            </h2>
          ) : (
            <>
              <h2 className="text-center">
                {"¿ESTÁ SEGURO DE SUBIR EL ARCHIVO?"}
              </h2>
              <br />
              <DialogContentText id="alert-dialog-description">
                <input
                  key={selecionarPDF} // Agregar una clave única para que se reinicie el input
                  value="" // Vaciar el valor del input
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
              </DialogContentText>
            </>
          )}
        </DialogContent>
        {errorSubirPdf && (
          <p className="text-center m-2 text-red-500">{errorSubirPdf}</p>
        )}
        {successMessage && (
          <p className="text-center m-2 text-green-500">{successMessage}</p>
        )}
        {pdfFoundMessage && ( // Ocultar el botón si pdfFoundMessage es verdadero
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        )}
        {!pdfFoundMessage && ( // Mostrar el botón si pdfFoundMessage es falso
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleFileUpload}
              disabled={!selectedFile}
            >
              Subir Archivo
            </Button>
            <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default SubirPdf;

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

const EliminarPdf = ({ nombreidpdf }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(null);

  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  console.log("aver si llego el nombreidpdf", nombreidpdf);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
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
        console.log("Archivo subido con éxito.");
        setSuccess("Archivo subido con éxito.");
        const pdfBlob = response.data;
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfBlobUrl);
        setPdfBlob(pdfBlob);
      } else {
        setError("Error al subir el archivo: " + response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError("Error: " + error.response.data.message);
      } else {
        setError("Error: " + error.message);
      }
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClickOpen(); // Abre el Dialog cuando el componente se monta
  }, []); // El segundo argumento es un array vacío para que se ejecute solo una vez al montarse el componente

  const [showPdf, setShowPdf] = useState(false);
  const handleDownloadPdf = async () => {
    if (pdfBlob) {
      setShowPdf(true); // Mostrar el PDF al recibir la respuesta
    }
  };

  const handleOpenPdf = () => {
    if (pdfBlob) {
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfBlobUrl, "_blank");
    }
  };

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
      } else {
        console.error("Error downloading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenDialog = () => {
    setShowUploadDialog(true); // Esta función abrirá el diálogo desde el componente BuscarViviend
  };

  const handleCloseDialog = () => {
    setShowUploadDialog(false);
  };

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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿ESTÁ SEGURO DE SUBIR EL ARCHIVO?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input
              className="block w-full text-sm bold text-mi-color-primario
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-mi-color-primario file:text-white
              hover:file:bg-mi-color-terceario"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
            {/* 
            {error && <p className="mt-2 text-red-500">{error}</p>}
            {success && <p className="mt-2 text-green-500">{success}</p>} */}
          </DialogContentText>
          {pdfUrl && ( // Mostrar el PDF si pdfUrl no es null
            <embed
              src={pdfUrl} // Mostrar la URL del PDF en un componente <embed>
              type="application/pdf"
              width="100%"
              height="600px"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              color: "red",
              fontWeight: "bold",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.color = "darkred")}
            onMouseOut={(e) => (e.target.style.color = "red")}
          >
            Cerrar
          </Button>
          <Button
            style={{
              color: "green",
              fontWeight: "bold",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.color = "darkgreen")}
            onMouseOut={(e) => (e.target.style.color = "green")}
            onClick={handleFileUpload}
          >
            Subir Archivo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EliminarPdf;

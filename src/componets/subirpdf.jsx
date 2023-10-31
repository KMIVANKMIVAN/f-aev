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

const SubirPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null); // Limpiar cualquier error anterior al seleccionar un nuevo archivo.
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
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${obtenerToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Archivo subido con éxito.");
        setSucess("Archivo subido con éxito.");
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

  return (
    <>
      <Button onClick={handleClickOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-green-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ESTA SEGURO DE SUBIR EL ARCHIVO?"}
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

            {error && <p className="mt-2 text-red-500">{error}</p>}
            {sucess && <p className="mt-2 text-green-500">{sucess}</p>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              color: "red",
              fontWeight: "bold", // Aumentamos el grosor del texto
              // fontSize: "1rem",
              transition: "color 0.3s", // Agregamos una transición suave
            }}
            onMouseOver={(e) => (e.target.style.color = "darkred")} // Cambiamos el color al pasar el mouse
            onMouseOut={(e) => (e.target.style.color = "red")}
          >
            Cerrar
          </Button>
          <Button
            style={{
              color: "green",
              fontWeight: "bold", // Aumentamos el grosor del texto
              // fontSize: "1rem",
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

export default SubirPdf;

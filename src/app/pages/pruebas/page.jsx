"use client";
import React, { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

import axios from "axios";
import { obtenerToken } from "../../../utils/auth";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Prueba = () => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/findAllDatosContrato`;
        const token = obtenerToken();

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers });

        if (response.status === 200) {
          setDatoscontratoData(response.data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "proy_cod",
        header: "CODIGO",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "cont_des",
        header: "PROYECTO",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "montocontrato",
        header: "MONTO CONTRATO Bs.",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "inst_des",
        header: "EMPRESA",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "bole_fechav",
        header: "ULTIMA BOLETA",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "etap_cod",
        header: "ESTADO SAP",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "depa_des",
        header: "DEPARTAMENTO",
        filterVariant: "text", // default
        size: 100,
      },
    ],
    [validationErrors]
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
        <p className="text-mi-color-primario text-2xl font-bold">
          Generacion Instruccion de Desembolso Vivienda Nueva
        </p>
        <MaterialReactTable
          columns={columns}
          data={datoscontratoData}
          initialState={{ density: "compact", showColumnFilters: true }}
        />
      </div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Prueba;

"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { obtenerToken } from "../../../../utils/auth";

import SubirPdf from "../../../../componets/subirpdf";

import BuscarcodigoCompoment from "../../../../componets/buscarcodigocompoment";
import BuscardepartamentoCompoment from "../../../../componets/buscardepartamentocompoment";
import BuscarproyectoCompoment from "../../../../componets/buscarproyectocompoment";
import ViviendanuevaTablaComponent from "../../../../componets/viviendanuevatablacomponent";
import ViviendanuevaTabl from "../../../../componets/viviendanuevatabl";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
const ViviendaNueva = () => {
  const [showUserTabla, setShowUserTabla] = useState(false);

  const toggleUserTabla = () => {
    setShowUserTabla(!showUserTabla);
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <h1 className="py-3 text-center text-mi-color-secundario text-2xl font-bold">
          Opciones de Búsqueda
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <BuscarcodigoCompoment />
          </div>
          <div className="col-span-1">
            <BuscardepartamentoCompoment />
          </div>
          <div className="col-span-1">
            <h2 className="p-3 text-mi-color-terceario text-1xl font-bold">
              Ver todos los Registros
            </h2>
            <Stack
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                margin: "0 auto", // Agregamos esta propiedad para centrar horizontalmente
              }}
            >
              <Button
                onClick={toggleUserTabla}
                // className="bg-mi-color-terceario"
                style={{
                  backgroundColor: "#0058a9",
                  color: "#ffffff",
                }}
                endIcon={<SendIcon />}
              >
                Mostrar
              </Button>
            </Stack>
          </div>
          <div className="col-span-1">
            <BuscarproyectoCompoment />
          </div>
        </div>
      </div>
      <br />
      {showUserTabla && <ViviendanuevaTablaComponent />}
      {/* <ViviendanuevaTabl /> */}
    </>
  );
};

export default ViviendaNueva;

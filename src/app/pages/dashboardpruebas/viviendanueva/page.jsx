"use client";
import React, { useState } from "react";

import ViviendanuevaTablaComponent from "../../../../componets/viviendanuevatablacomponent";

import BuscarViviend from "../../../../componets/buscarviviend";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MarginIcon from "@mui/icons-material/Margin";

const ViviendaNueva = () => {
  const [showUserTabla, setShowUserTabla] = useState(false);

  const toggleUserTabla = () => {
    setShowUserTabla(!showUserTabla);
  };
  return (
    <>
      <BuscarViviend />
      <br />
      <div className="flex min-h-full flex-col justify-center px-1 lg:px-4">
        <Stack className="pl-7" spacing={2} direction="row">
          <Button
            variant="outlined"
            onClick={toggleUserTabla}
            endIcon={<MarginIcon />}
          >
            Ver todos los Registros
          </Button>
        </Stack>
      </div>
      {showUserTabla && <ViviendanuevaTablaComponent />}
    </>
  );
};

export default ViviendaNueva;

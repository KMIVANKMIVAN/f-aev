"use client";
import React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const CarnetuserCompoment = () => {
  return (
    <>
      <h2 className="p-3 text-mi-color-terceario text-1xl font-bold">
        Buscar por Carnet de identidad
      </h2>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          margin: "0 auto", // Agregamos esta propiedad para centrar horizontalmente
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="12345678"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </>
  );
};

export default CarnetuserCompoment;
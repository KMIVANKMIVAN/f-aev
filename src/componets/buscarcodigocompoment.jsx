"use client";
import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";
import { obtenerToken } from "../utils/auth";

import ViviendanuevaTabl from "./viviendanuevatabl";

const BuscarcodigoCompoment = () => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchValue.trim() === "") {
          return;
        }

        const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/codigo/${searchValue}`;
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
  }, [searchValue]);

  return (
    <>
      <h2 className="p-3 text-mi-color-terceario text-1xl font-bold">
        Buscar por Codigo
      </h2>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          margin: "0 auto",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="AEV-LP-0000"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </>
  );
};

export default BuscarcodigoCompoment;

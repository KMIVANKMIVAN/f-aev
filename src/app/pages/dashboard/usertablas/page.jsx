"use client";
import React, { useState, useEffect } from "react";
import UserTablaComponet from "../../../../componets/usertablacomponent";
import NomuserCompoment from "../../../../componets/nomusercompoment";
import CarnetuserCompoment from "../../../../componets/carnetusercompoment";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

const UserTablas = () => {
  const urltable = "/pages/dashboard/userstablas";
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
            <NomuserCompoment />
          </div>
          <div className="col-span-1">
            <CarnetuserCompoment />
          </div>
          <div className="col-span-1">
            <h2 className="p-3 text-mi-color-terceario text-1xl font-bold">
              Ver todos los Usuarios
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
                style={{ backgroundColor: "#0058a9", color: "#ffffff" }}
                endIcon={<SendIcon />}
              >
                Mostrar
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <br />
      {showUserTabla && <UserTablaComponet urltable={urltable} />}
    </>
  );
};

export default UserTablas;

"use client";
import React, { useState, useEffect } from "react";

import BuscarUser from "../../../../componets/buscaruser";
import CrearUser from "../../../../componets/crearuser";
import TablaUser from "../../../../componets/tablauser";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MarginIcon from "@mui/icons-material/Margin";

const UserTablas = () => {
  const urltable = "/pages/dashboard/userstablas";
  const [showUserTabla, setShowUserTabla] = useState(false);

  const toggleUserTabla = () => {
    setShowUserTabla(!showUserTabla);
  };
  return (
    <>
      <BuscarUser urltable={urltable} />
      <br />
      <div className="flex min-h-full flex-col justify-center px-1 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className="col-span-1 flex justify-center ">
            <CrearUser urltable={urltable} />
          </div>
          <div className="col-span-1 flex justify-center md:px-20">
            <Stack className="pl-7" spacing={2} direction="row">
              <Button
                onClick={toggleUserTabla}
                variant="outlined"
                endIcon={<MarginIcon />}
              >
                Ver todos los Usuarios
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      {showUserTabla && <TablaUser urltable={urltable} />}
      {/* <TablaUser urltable={urltable} /> */}
    </>
  );
};

export default UserTablas;

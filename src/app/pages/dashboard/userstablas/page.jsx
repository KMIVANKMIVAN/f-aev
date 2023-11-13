"use client";
import React, { useState, useEffect } from "react";

import BuscarUser from "../../../../componets/buscaruser";
import CrearUser from "../../../../componets/crearuser";
import TablaUser from "../../../../componets/tablauser";
import { useRouter } from "next/navigation";
const UsersTablas = () => {
  const router = useRouter();
  const urltable = "/pages/dashboard/usertablas";
  const [showUserTablas, setShowUserTablas] = useState(false);


  // Este efecto restablecerá el estado cuando se monte el componente
  useEffect(() => {
    setShowUserTablas(false);
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <h2 className="p-3 text-mi-color-terceario text-2xl font-bold">
          Usuarios
        </h2>
        <CrearUser urltable={urltable} />
      </div>

      <br />
      <BuscarUser
        urltable={urltable}
        onHideUserTablas={() => setShowUserTablas(false)} // Pasar una función para cerrar el diálogo desde BuscarUser
      />
      <br />
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <h2 className="p-3 text-mi-color-terceario text-2xl font-bold">
          Usuarios
        </h2>
        <TablaUser urltable={urltable} />
      </div>
    </>
  );
};

export default UsersTablas;

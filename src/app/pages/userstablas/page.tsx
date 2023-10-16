"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../componets/protectedroute";
import { obtenerToken } from "../../../utils/auth";

import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavbarInterna from "../../../componets/navbarinterna";

import { Button } from "@material-tailwind/react";

import { IconButton } from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const UsersTablas = () => {
  const columns = [
    {
      name: "id",
      lavel: "ID",
      options: {
        filter: true,
        // sort: true,
      },
    },
    {
      name: "username",
      lavel: "USUARIO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "superior",
      lavel: "SUPERIOR",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nombre",
      lavel: "NOMBRES",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nivel",
      lavel: "NIVEL",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "prioridad",
      lavel: "PRIORIDAD/GENERICA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "idOficina",
      lavel: "ID DE OFICINA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dependencia",
      lavel: "DEPENDENCIA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "lastLogin",
      lavel: "LAST LOGIN",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "mosca",
      lavel: "MOSCA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cargo",
      lavel: "CARGO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      lavel: "CORREO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "logins",
      lavel: "LOGIN",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "fechaCreacion",
      lavel: "FECHA DE CREACION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "habilitado",
      lavel: "HABILITADO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "genero",
      lavel: "GENERO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "idEntidad",
      lavel: "ID ENTIDAD",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cedulaIdentidad",
      lavel: "CEDULA IDENTIDAD",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "expedido",
      lavel: "EXPENDIO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "super",
      lavel: "SUPER",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filter: "true",
    filterType: "dropdown",
    responsive: "horisontal",
    enableNestedDataAccess: ".",
    selectableRows: false,
    print: false, // Desactiva el botón de impresión
    filter: false, // Desactiva el botón de impresión
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Habilitar el modo nocturno
    },
  });
  const router = useRouter();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:3000/users"; // Cambia la URL según tu configuración
        const token = obtenerToken();

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers });

        if (response.status === 200) {
          setUsersData(response.data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const customToolbar = () => (
    <div className="flex items-center gap-4">
      <Button
        variant="gradient"
        className="flex items-center gap-3 text-green-500"
        onClick={() => router.push("/pages/registeruser")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Anadir Usuarios
      </Button>
    </div>
  );

  return (
    <ProtectedRoute>
      <NavbarInterna />
      {/* <div className="mx-auto max-w-screen-xl pt-10"> */}

      {/* </div> */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            // title={"Usuarios"}
            title={<>{customToolbar()} </>}
            data={usersData}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </ProtectedRoute>
  );
};

export default UsersTablas;

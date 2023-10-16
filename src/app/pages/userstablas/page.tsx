"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../componets/protectedroute";
import { obtenerToken } from "../../../utils/auth";

import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavbarInterna from "../../../componets/navbarinterna";

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
      name: "theme",
      lavel: "THEME",
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

  return (
    <ProtectedRoute>
      <NavbarInterna />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            title={"Employee List"}
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

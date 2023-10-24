"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../componets/protectedroute";
import { obtenerToken } from "../../../utils/auth";

import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavbarInterna from "../../../componets/navbarinterna";

import {
  ButtonGroup,
  Button,
  Dialog,
  Typography,
  DialogHeader,
} from "@material-tailwind/react";

import UpdateUser from "../../../componets/updateuser";
import UpdatePassword from "../../../componets/updatepassword";

import SiderNavbar from "../../../componets/sidernavbar";

const UsersTablas = () => {
  const router = useRouter();
  const [usersData, setUsersData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [selectedPasswordId, setSelectedPasswordId] = useState(null);
  const [modalOpenPassword, setModalOpenPassword] = useState(false);

  const urltable = "/pages/usertablas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users`;
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

  const actualizarEstado = async (selectedUserIdHabilitado, nuevoEstado) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/${selectedUserIdHabilitado}`;
      const token = obtenerToken();

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(
        url,
        { habilitado: nuevoEstado },
        { headers }
      );

      if (response.status === 200) {
        // La actualización se realizó con éxito en la base de datos
        // Puedes recargar los datos de la tabla o realizar otras acciones necesarias.
        router.push(urltable);
      } else {
        console.error("Error al actualizar el estado del usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      name: "actualizar",
      label: "ACTUALIZAR",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                handleEditClick(tableMeta.rowData[3]);
                handleOpenModal();
              }}
              className="text-orange-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
        ),
      },
    },
    {
      name: "resetearPassword",
      label: "RESETEAR CONTRASEÑA",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => handleEditClickPassword(tableMeta.rowData[3])}
              className="text-red-600"
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
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </button>
          </div>
        ),
      },
    },
    {
      name: "habilitado",
      label: "HABILITAR / DESABILITAR",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>
            <button
              className="bg-transparent hover:bg-stone-200 py-2 px-4"
              style={{
                // backgroundColor: value === 1 ? "red" : "green",
                color: value === 1 ? "red" : "green",
                border: `2px solid ${value === 1 ? "red" : "green"}`,
                borderRadius: "5px",
              }}
              /* onClick={() => {
              handleClickHabilitado(tableMeta.rowData[2]);
              // const rowId = tableMeta.rowData[0]; // Suponiendo que el ID está en la primera columna
              const nuevoEstado = value === 1 ? 0 : 1; // Cambia de 1 a 0 y viceversa
              actualizarEstado(selectedUserIdHabilitado, nuevoEstado);
            }} */
              onClick={() => {
                const nuevoEstado = value === 1 ? 0 : 1;
                actualizarEstado(tableMeta.rowData[3], nuevoEstado);
              }}
            >
              {value === 1 ? "Desabilitar" : "Habilitar"}
            </button>
          </div>
        ),
      },
    },
    {
      name: "id",
      lavel: "ID",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "habilitado",
      lavel: "HABILITADO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "username",
      lavel: "USUARIO",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "superior",
      lavel: "SUPERIOR",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "nombre",
      lavel: "NOMBRES",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "nivel",
      lavel: "NIVEL",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "prioridad",
      lavel: "PRIORIDAD/GENERICA",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "idOficina",
      lavel: "ID DE OFICINA",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "dependencia",
      lavel: "DEPENDENCIA",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "lastLogin",
      lavel: "LAST LOGIN",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "mosca",
      lavel: "MOSCA",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "cargo",
      lavel: "CARGO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "email",
      lavel: "CORREO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "logins",
      lavel: "LOGIN",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "fechaCreacion",
      lavel: "FECHA DE CREACION",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "genero",
      lavel: "GENERO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "idEntidad",
      lavel: "ID ENTIDAD",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "cedulaIdentidad",
      lavel: "CEDULA IDENTIDAD",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "expedido",
      lavel: "EXPENDIO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
    {
      name: "super",
      lavel: "SUPER",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
    },
  ];

  const options = {
    filter: false,
    filterType: undefined,
    enableNestedDataAccess: ".",
    selectableRows: false,
    print: false,
    responsive: "horisontal",
    /* onRowClick: (rowData, rowMeta) => {
      if (rowMeta && rowMeta.colIndex === 0) {
        handleEditClick(rowData[2]);
      }
    }, */
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const createUser = () => (
    // <div className="flex items-center gap-4">
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
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Anadir Usuarios
    </Button>
    // </div>
  );
  const updateUser = () => (
    // <div className="flex items-center gap-4">
    <Button
      variant="gradient"
      className="flex items-center gap-3 text-red-500"
      onClick={() => router.push("/pages/updateuser")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
      Editar Usuarios
    </Button>
    // </div>
  );
  const updateUserPassword = () => (
    // <div className="flex items-center gap-4">
    <Button
      variant="gradient"
      className="flex items-center gap-3 text-red-500"
      onClick={() => router.push("/pages/updateuserpassword")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
      Cambiar Contrasena Usuarios
    </Button>
    // </div>
  );

  const handleEditClick = (id) => {
    setSelectedUserId(id);
    setModalOpen(true);
  };
  const handleEditClickPassword = (id) => {
    setSelectedPasswordId(id);
    setModalOpenPassword(true);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // router.push("/pages/usertablas");
  };
  const handleOpenModalPassword = () => {
    setModalOpen(true);
  };

  const handleCloseModalPassword = () => {
    setModalOpen(false);
  };

  return (
    <ProtectedRoute>
      {/* <NavbarInterna /> */}

      <Dialog
        open={modalOpen}
        onClose={() => {
          setSelectedUserId(null);
          setModalOpen(false);
        }}
        className="rounded-lg w-96 p-5 my-4 dark:bg-slate-100"
        style={{
          position: "fixed",
          left: "40%",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          zIndex: 9999,
        }}
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Actualizar Usuario
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-10 w-8"
            onClick={() => {
              setModalOpen(false);
              // handleCloseModal();
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <UpdateUser userId={selectedUserId} urltable={urltable} />
      </Dialog>
      <Dialog
        open={modalOpenPassword}
        onClose={() => {
          setSelectedPasswordId(null);
          setModalOpenPassword(false);
        }}
        className="rounded-lg w-96 p-5 my-4 dark:bg-slate-100"
        style={{
          position: "fixed",
          top: "30%",
          left: "40%",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          zIndex: 9999,
        }}
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Resetear Contraseña
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-10 w-8"
            onClick={() => {
              setModalOpenPassword(false);
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <UpdatePassword userId={selectedPasswordId} urltable={urltable} />
      </Dialog>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <MUIDataTable
          title={<ButtonGroup>{createUser()}</ButtonGroup>}
          data={usersData}
          columns={columns}
          options={options}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UsersTablas;

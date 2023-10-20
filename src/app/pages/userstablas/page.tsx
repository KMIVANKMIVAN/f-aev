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

const UsersTablas = () => {
  const router = useRouter();
  const [usersData, setUsersData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [selectedPasswordId, setSelectedPasswordId] = useState(null);
  const [modalOpenPassword, setModalOpenPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users`; // Cambia la URL según tu configuración
        // const url = "http://localhost:3000/users"; // Cambia la URL según tu configuración
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
  const columns = [
    {
      name: "actualizar",
      label: "ACTUALIZAR",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <button
            onClick={() => {
              handleEditClick(tableMeta.rowData[2]);
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
        ),
      },
    },
    {
      name: "resetearPassword",
      label: "RESETEAR PASSWORD",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <button
            onClick={() => handleEditClickPassword(tableMeta.rowData[2])}
            className="text-red-600"
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
        ),
      },
    },
    {
      name: "id",
      lavel: "ID",
      options: {
        filter: true,
        // sort: true,
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

  /* const options = {
    filter: "true",
    filterType: "dropdown",
    // responsive: "horisontal",
    enableNestedDataAccess: ".",
    selectableRows: false,
    print: false, // Desactiva el botón de impresión
  }; */

  const options = {
    filter: false,
    filterType: undefined,
    enableNestedDataAccess: ".",
    selectableRows: false,
    print: false,
    onRowClick: (rowData, rowMeta) => {
      if (rowMeta && rowMeta.colIndex === 0) {
        handleEditClick(rowData[2]);
      }
    },
  };

  // Resto de tus opciones

  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Habilitar el modo nocturno
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
    // Aquí puedes manejar la lógica para editar el usuario con el ID proporcionado
    console.log(`ID seleccionado para editar: ${id}`);
    // Redirige a la página de edición con el ID
    // router.push(`/pages/updateuser/${id}`);
    setSelectedUserId(id); // Establece el ID seleccionado en el estado
    setModalOpen(true); // Abre el modal
  };
  const handleEditClickPassword = (id) => {
    console.log(`ID seleccionado para editar contraseña: ${id}`);
    // Redirige a la página de edición de contraseña con el ID
    // router.push(`/pages/updateuserpassword/${id}`);
    setSelectedPasswordId(id); // Establece el ID seleccionado en el estado
    setModalOpenPassword(true);
  };

  const handleOpenModal = () => {
    setModalOpen(true); // Abre el modal al hacer clic en un botón
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cierra el modal
  };
  const handleOpenModalPassword = () => {
    setModalOpen(true); // Abre el modal al hacer clic en un botón
  };

  const handleCloseModalPassword = () => {
    setModalOpen(false); // Cierra el modal
  };

  return (
    <ProtectedRoute>
      <NavbarInterna />
      {/* <div className="mx-auto max-w-screen-xl pt-10"> */}

      {/* </div> */}

      <Dialog
        open={modalOpen}
        // onClose={handleCloseModal}
        onClose={() => {
          setSelectedUserId(null); // Limpia el ID seleccionado al cerrar el modal
          setModalOpen(false); // Cierra el modal
        }}
        className="rounded-lg w-96 p-5 my-4 dark:bg-slate-50"
        // className="bg-transparent mx-auto my-auto px-6 px-6 py-12 lg:px-8"
        // style={{ maxHeight: "650px", maxWidth: "400px", overflowY: "auto" }}
        style={{
          position: "fixed",
          left: "40%",
          // transform: "translate(-50%, -50%)",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          zIndex: 9999,
        }}
      >
        {/* <UpdateUser /> */}
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Actualizar Usuario
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-10 w-8"
            // onClick={handleOpenModal}
            onClick={() => {
              // Limpia el ID seleccionado al cerrar el modal
              setModalOpen(false); // Cierra el modal
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <UpdateUser userId={selectedUserId} />
        {/* <Button onClick={handleCloseModal} className="bg-orange-500 "> */}
        {/* <Button
          className="bg-orange-500 "
          onClick={() => {
            setSelectedUserId(null); // Limpia el ID seleccionado al cerrar el modal
            setModalOpen(false); // Cierra el modal
          }}
        >
          Cerrar
        </Button> */}
      </Dialog>
      <Dialog
        open={modalOpenPassword}
        onClose={() => {
          setSelectedPasswordId(null); // Limpia el ID seleccionado al cerrar el modal
          setModalOpenPassword(false); // Cierra el modal
        }}
        className="rounded-lg w-96 p-5 my-4 dark:bg-slate-50"
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
        {/* <UpdateUser /> */}
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
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
              setModalOpenPassword(false); // Cierra el modal
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <UpdatePassword userId={selectedPasswordId} />
      </Dialog>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {/* <ThemeProvider theme={darkTheme}> */}

        <MUIDataTable
          // title={"Usuarios"}
          title={
            <ButtonGroup>
              {createUser()}
              {/* {updateUser()}
              {updateUserPassword()} */}
            </ButtonGroup>
          }
          data={usersData}
          columns={columns}
          options={options}
        />
        {/* </ThemeProvider> */}
      </div>
    </ProtectedRoute>
  );
};

export default UsersTablas;

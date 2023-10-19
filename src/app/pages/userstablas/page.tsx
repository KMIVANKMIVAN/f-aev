"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../componets/protectedroute";
import { obtenerToken } from "../../../utils/auth";

import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavbarInterna from "../../../componets/navbarinterna";

import { ButtonGroup, Button, Dialog } from "@material-tailwind/react";

import UpdateUser from "../../../componets/updateuser";

const UsersTablas = () => {
  const router = useRouter();
  const [usersData, setUsersData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
      name: "editar",
      label: "EDITAR",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <button
            onClick={() => handleEditClick(tableMeta.rowData[2])} // El ID se encuentra en la segunda columna
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
      name: "editarPassword",
      label: "EDITAR PASSWORD",
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
  };
  const handleEditClickPassword = (id) => {
    console.log(`ID seleccionado para editar contraseña: ${id}`);
    // Redirige a la página de edición de contraseña con el ID
    // router.push(`/pages/updateuserpassword/${id}`);
  };

  const handleOpenModal = () => {
    setModalOpen(true); // Abre el modal al hacer clic en un botón
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cierra el modal
  };

  return (
    <ProtectedRoute>
      <NavbarInterna />
      {/* <div className="mx-auto max-w-screen-xl pt-10"> */}

      {/* </div> */}
      <div className="bg-green-400 flex items-start justify-center">
        <Button onClick={handleOpenModal} className="bg-blue-800">
          Abrir Modal
        </Button>
      </div>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        className="bg-transparent mx-auto my-auto px-6 py-12 lg:px-8"
      >
        <div
          className="bg-transparent "
          // style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <UpdateUser />
        </div>
        <div className="bg-transparent flex items-start justify-center py-5">
          <Button onClick={handleCloseModal} className="bg-blue-800 ">
            Cerrar
          </Button>
        </div>
      </Dialog>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {/* <ThemeProvider theme={darkTheme}> */}

        <MUIDataTable
          // title={"Usuarios"}
          title={
            <ButtonGroup>
              {createUser()}
              {updateUser()}
              {updateUserPassword()}
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

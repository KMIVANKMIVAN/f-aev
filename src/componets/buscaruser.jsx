"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

import UpdateUser from "./updateuser";
import ResetPassword from "./resetpassword";
import ActualizarUser from "./actualizaruser";
import ResetearPassword from "./resetearpassword";

import axios from "axios";
import { obtenerToken } from "../utils/auth";

import Checkbox from "@mui/material/Checkbox";

import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
const BuscarUser = ({ urltable }) => {
  const [buscar, setBuscar] = useState(""); // Estado para guardar el valor concatenado
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [textoFinal, setTextoFinal] = useState(""); // Estado para guardar la concatenación

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  //nomuser>ivan.choque<carnetuser>8433318
  useEffect(() => {
    const textParts = [];

    if (buscar.nomuser) {
      textParts.push(`nomuser>${buscar.nomuser}<`);
    }

    if (buscar.carnetuser) {
      textParts.push(`<carnetuser>${buscar.carnetuser}`);
    }

    const finalText = textParts.join("");

    // Reemplaza cualquier secuencia de '<<' por '<'
    setTextoFinal(finalText.replace(/<<+/g, "<"));
  }, [buscar]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("888", name);
    console.log("999", value);
    // const modifiedValue = name === "nomproy" ? `${value}<` : value;
    setBuscar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // handleSearch();
  };

  const handleSearch = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/buscar/${textoFinal}`;
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        setDatoscontratoData(response.data);
        setIsDataLoaded(true); // Marca los datos como cargados
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("111 ", buscar);
  console.log("222 ", textoFinal);

  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isActualizarUserVisible, setIsActualizarUserVisible] = useState(false);
  const [isActualizarColumnVisible, setIsActualizarColumnVisible] =
    useState(false);

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users`;
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
  }, []); */

  const createUser = () => (
    <Button
      variant="gradient"
      className="flex items-center gap-3 text-green-500"
      onClick={() => router.push("/pages/dashboard/registeruser")}
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
  );

  /* const showActualizarUser = (userId) => {
    setSelectedUserId(userId);
    setIsActualizarUserVisible(true);
  }; */

  /* const showActualizarUser = (userId) => {
    setSelectedUserId(userId);
    setIsActualizarUserVisible(true);

    // Muestra la columna "ACTUALIZAR" cuando se hace clic en el checkbox
    setIsActualizarColumnVisible(true);
  }; */
  /* const showActualizarUser = (userId) => {
    setSelectedUserId(userId);
    setIsActualizarUserVisible(!isActualizarUserVisible); // Alternar la visibilidad del componente
  }; */
  const showActualizarUser = (userId) => {
    if (userId === selectedUserId) {
      setIsActualizarUserVisible(!isActualizarUserVisible); // Alternar la visibilidad del componente
    } else {
      setSelectedUserId(userId);
      setIsActualizarUserVisible(true);
    }
  };

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
        router.push(urltable);
      } else {
        console.error("Error al actualizar el estado del usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: "seleccionar",
        header: "SELECCIONAR",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => showActualizarUser(row.original.id)}
                variant="outlined"
                size="small"
                endIcon={<SendIcon size="small" />}
              ></Button>
            </Stack>
          </div>
        ),
      },
      {
        accessorKey: "actualizar",
        header: "ACTUALIZAR",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ row }) =>
          row.original.id === selectedUserId && isActualizarUserVisible ? (
            <div>
              <ActualizarUser
                userId={selectedUserId}
                urltable={urltable}
                hideActualizarUser={() => setIsActualizarUserVisible(false)}
              />
            </div>
          ) : null,
      },
      {
        accessorKey: "resetearPassword",
        header: "RESETEAR CONTRASEÑA",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ row }) =>
          row.original.id === selectedUserId && isActualizarUserVisible ? (
            <div>
              <ResetearPassword
                userId={selectedUserId}
                hideActualizarUser={() => setIsActualizarUserVisible(false)}
              />
            </div>
          ) : null,
      },
      {
        accessorKey: "habilitado",
        header: "HABILITAR / DESABILITAR",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({
          row: {
            original: { id, habilitado },
          },
          value,
        }) =>
          id === selectedUserId && isActualizarUserVisible ? (
            <div>
              <button
                className="bg-transparent hover:bg-stone-200 py-2 px-4"
                style={{
                  color: habilitado === 1 ? "red" : "green",
                  border: `2px solid ${habilitado === 1 ? "red" : "green"}`,
                  borderRadius: "5px",
                }}
                onClick={() => {
                  const nuevoEstado = habilitado === 1 ? 0 : 1;
                  actualizarEstado(id, nuevoEstado);
                }}
              >
                {habilitado === 1 ? "Desabilitar" : "Habilitar"}
              </button>
            </div>
          ) : null,
      },
      {
        accessorKey: "id",
        header: "ID",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "habilitado",
        header: "HABILITADO",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "username",
        header: "USUARIO",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "superior",
        header: "SUPERIOR",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "nombre",
        header: "NOMBRES",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "nivel",
        header: "NIVEL",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "prioridad",
        header: "PRIORIDAD/GENERICA",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "id_oficina",
        header: "ID DE OFICINA",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "dependencia",
        header: "DEPENDENCIA",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "last_login",
        header: "LAST LOGIN",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "mosca",
        header: "MOSCA",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "cargo",
        header: "CARGO",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "email",
        header: "CORREO",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "logins",
        header: "LOGIN",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "fecha_creacion",
        header: "FECHA DE CREACION",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "genero",
        header: "GENERO",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "id_entidad",
        header: "ID ENTIDAD",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "cedula_identidad",
        header: "CEDULA IDENTIDAD",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "expedido",
        header: "EXPENDIO",
        filterVariant: "text", // default
        size: 50,
      },
      {
        accessorKey: "super",
        header: "SUPER",
        filterVariant: "text", // default
        size: 50,
      },
    ],
    [selectedUserId, isActualizarUserVisible, isActualizarColumnVisible]
  );

  console.log("id", selectedUserId);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <h2 className="p-3 text-mi-color-terceario text-2xl font-bold">
          Buscar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className="col-span-1 flex justify-center md:px-20">
            <TextField
              name="nomuser"
              helperText="Ejemplo: nombre.apellido"
              id="standard-basic"
              label="Nombre de Usuario:"
              variant="standard"
              className="w-full "
              value={buscar.nomuser || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1 flex justify-center md:px-20">
            <TextField
              name="carnetuser"
              helperText="Ejemplo: 123456789"
              id="standard-basic"
              label="Carnet de Identidad Usuario:"
              variant="standard"
              className="w-full"
              value={buscar.carnetuser || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center pt-5">
          <Stack className="pl-7" spacing={2} direction="row">
            <Button
              onClick={handleSearch}
              variant="outlined"
              endIcon={<ZoomInIcon />}
            >
              Buscar
            </Button>
          </Stack>
          {/* <Button variant="outlined" onClick={handleSearch}>
            <span className="mr-2">Buscar</span>{" "}
            
          </Button> */}
        </div>
      </div>
      {isDataLoaded && (
        <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
          <MaterialReactTable
            enableHiding={false}
            enableGlobalFilter={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            columns={columnas}
            data={datoscontratoData}
            enableFacetedValues
            initialState={{ density: "compact" }}
            /* muiTableBodyRowProps={({ row }) => ({
              onClick: (event) => {
                setSelectedUserId(row.original.id);
                setIsActualizarUserVisible(true);
              },
              sx: {
                cursor: "pointer",
              },
            })} */
          />
        </div>
      )}
    </>
  );
};

export default BuscarUser;

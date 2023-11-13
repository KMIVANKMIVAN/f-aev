import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { useRouter } from "next/navigation";
import axios from "axios";
import { obtenerToken } from "../utils/auth";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import ActualizarUser from "./actualizaruser";
import ResetearPassword from "./resetearpassword";

const TablaUser = ({ urltable }) => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isActualizarUserVisible, setIsActualizarUserVisible] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
          setDatoscontratoData(response.data);
          setIsDataLoaded(true);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const showActualizarUser = (userId) => {
    if (userId === selectedUserId) {
      setIsActualizarUserVisible(!isActualizarUserVisible);
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
        size: 50,
      },
      {
        accessorKey: "habilitado",
        header: "HABILITADO",
        size: 50,
      },
      {
        accessorKey: "username",
        header: "USUARIO",
        size: 50,
      },
      {
        accessorKey: "superior",
        header: "SUPERIOR",
        size: 50,
      },
      {
        accessorKey: "nombre",
        header: "NOMBRES",
        size: 50,
      },
      {
        accessorKey: "nivel",
        header: "NIVEL",
        size: 50,
      },
      {
        accessorKey: "prioridad",
        header: "PRIORIDAD/GENERICA",
        size: 50,
      },
      {
        accessorKey: "id_oficina",
        header: "ID DE OFICINA",
        size: 50,
      },
      {
        accessorKey: "dependencia",
        header: "DEPENDENCIA",
        size: 100,
      },
      {
        accessorKey: "last_login",
        header: "LAST LOGIN",
        size: 50,
      },
      {
        accessorKey: "mosca",
        header: "MOSCA",
        size: 50,
      },
      {
        accessorKey: "cargo",
        header: "CARGO",
        size: 50,
      },
      {
        accessorKey: "email",
        header: "CORREO",
        size: 50,
      },
      {
        accessorKey: "logins",
        header: "LOGIN",
        size: 50,
      },
      {
        accessorKey: "fecha_creacion",
        header: "FECHA DE CREACION",
        size: 50,
      },
      {
        accessorKey: "genero",
        header: "GENERO",
        size: 50,
      },
      {
        accessorKey: "id_entidad",
        header: "ID ENTIDAD",
        size: 50,
      },
      {
        accessorKey: "cedula_identidad",
        header: "CEDULA IDENTIDAD",
        size: 50,
      },
      {
        accessorKey: "expedido",
        header: "EXPENDIO",
        size: 50,
      },
      {
        accessorKey: "super",
        header: "SUPER",
        size: 50,
      },
    ],
    [selectedUserId, isActualizarUserVisible]
  );

  console.log("id", selectedUserId);

  return (
    <>
      {isDataLoaded && (
        <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
          <MaterialReactTable
            enableHiding={false}
            // enableGlobalFilter={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            // enablePagination={false}
            enableSorting={false}
            columns={columnas}
            data={datoscontratoData}
            enableFacetedValues
            initialState={{ density: "compact" }}
          />
        </div>
      )}
    </>
  );
};

export default TablaUser;

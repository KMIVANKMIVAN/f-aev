"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { obtenerToken } from "../../../../utils/auth";

const ViviendaNueva = () => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [contcodData, setContcodData] = useState([]);
  const [selectedContCod, setSelectedContCod] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/findAllDatosContrato`;
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
  }, []);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        // const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/contcod/${selectedContCod}`;
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/contcod/C-AEV-01-000055`;
        const token = obtenerToken();

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers });

        if (response.status === 200) {
          setContcodData(response.data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData2();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "proy_cod",
        header: "CODIGO",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "cont_des",
        header: "PROYECTO",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "montocontrato",
        header: "MONTO CONTRATO Bs.",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "inst_des",
        header: "EMPRESA",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "bole_fechav",
        header: "ULTIMA BOLETA",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "etap_cod",
        header: "ESTADO SAP",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "depa_des",
        header: "DEPARTAMENTO",
        filterVariant: "text", // default
        size: 100,
      },
    ],
    []
  );
  const columns2 = useMemo(
    () => [
      {
        accessorKey: "ploc_des",
        enableColumnFilter: false,
        header: "OBJETO",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "modificatorio",
        enableColumnFilter: false,
        header: "CONTRATO MODIFICATORIO",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "planillado",
        enableColumnFilter: false,
        header: "AVANCE FISICO Bs.",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "retencion_anticipo",
        enableColumnFilter: false,
        header: "DESCUENTO ANTICIPO / RETENCION Bs.",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "multas",
        enableColumnFilter: false,
        header: "DESCUENTO MULTAS Bs.",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "desembolso",
        enableColumnFilter: false,
        header: "MONTO A DESEMBOLSAR Bs.",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "planillado",
        enableColumnFilter: false,
        header: "DESEMBOLSADO",
        filterVariant: "text", // default
        size: 100,
      },
    ],
    []
  );

  console.log("1111 " + selectedContCod);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
        <MaterialReactTable
          columns={columns}
          data={datoscontratoData}
          enableFacetedValues
          initialState={{ showColumnFilters: true }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              // Manejador de clic en fila
              setSelectedContCod(row.original.cont_cod);
            },
            sx: {
              cursor: "pointer", // Cambiar el cursor al hacer clic
            },
          })}
        />
      </div>
      <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
        <MaterialReactTable
          columns={columns2}
          data={contcodData}
          enableFacetedValues
          initialState={{ showColumnFilters: true }}
        />
      </div>
      {/* {selectedContCod && (
        <div>
          Cont_cod seleccionado: {selectedContCod}
        </div>
      } */}
      {/* {selectedContCod && (
        <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
          <MaterialReactTable
          columns={columns2}
          data={contcodData}
          enableFacetedValues
          initialState={{ showColumnFilters: true }}
        />
        </div>
      )} */}
    </>
  );
};

export default ViviendaNueva;

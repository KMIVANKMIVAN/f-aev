"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { data } from "./makeData";
import axios from "axios";
import { obtenerToken } from "../../../utils/auth";

const Prueba = () => {
  /* const [datoscontratoData, setDatoscontratoData] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato`;
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
  fetchData(); */

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "proy_cod",
        header: "proy_cod",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "cont_cod",
        header: "cont_cod",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "depa_des",
        enableColumnFilter: false,
        header: "depa_des",
        size: 100,
      },
      {
        accessorKey: "cont_montobs",
        enableColumnFilter: false,
        header: "cont_montobs",
        size: 100,
      },
      {
        accessorKey: "montocontrato",
        enableColumnFilter: false,
        header: "montocontrato",
        size: 100,
      },
      {
        accessorKey: "cont_des",
        enableColumnFilter: false,
        header: "cont_des",
        size: 100,
      },
      {
        accessorKey: "inst_cod",
        enableColumnFilter: false,
        header: "inst_cod",
        size: 100,
      },
      {
        accessorKey: "inst_des",
        enableColumnFilter: false,
        header: "inst_des",
        size: 100,
      },
      {
        accessorKey: "prmo_cant",
        enableColumnFilter: false,
        header: "prmo_cant",
        size: 100,
      },
      {
        accessorKey: "comp_cod",
        enableColumnFilter: false,
        header: "comp_cod",
        size: 100,
      },
      {
        accessorKey: "inst_contac",
        enableColumnFilter: false,
        header: "inst_contac",
        size: 100,
      },
      {
        accessorKey: "bole_fechav",
        enableColumnFilter: false,
        header: "bole_fechav",
        size: 100,
      },
      {
        accessorKey: "dias",
        enableColumnFilter: false,
        header: "dias",
        size: 100,
      },
      {
        accessorKey: "etap_cod",
        enableColumnFilter: false,
        header: "etap_cod",
        size: 100,
      },
    ],
    []
  );
  return (
    <div className="">
      {/* <MaterialReactTable
        columns={columns}
        data={datoscontratoData}
        enableFacetedValues
        initialState={{ showColumnFilters: true }}
      /> */}
    </div>
  );
};

export default Prueba;

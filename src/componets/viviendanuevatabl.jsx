"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { obtenerToken } from "../utils/auth";

import SubirPdf from "./subirpdf";

const ViviendanuevaTabl = () => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [contcodData, setContcodData] = useState([]);
  const [contcodComplejaData, setContcodComplejaData] = useState([]);
  const [selectedContCod, setSelectedContCod] = useState(null);

  /* useEffect(() => {
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
  }, []); */

  useEffect(() => {
    const fetchData2 = async () => {
      if (selectedContCod) {
        try {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/datoscontrato/contcod/${selectedContCod}`;
          const token = obtenerToken();

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(url, { headers });

          if (response.status === 200) {
            console.log("hola");
            setContcodData(response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData2();
  }, [selectedContCod]);

  useEffect(() => {
    const fetchData3 = async () => {
      if (contcodData.length > 0) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_BACKEND;
          const plocCodParams = contcodData
            .map((item) => `ploccod=${item.ploc_cod}`)
            .join("&");

          const url = `${baseUrl}/datoscontrato/compleja/${selectedContCod}/${contcodData[0].titr_cod}?${plocCodParams}`;

          const token = obtenerToken();

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(url, { headers });

          if (response.status === 200) {
            setContcodComplejaData(response.data);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    fetchData3();
  }, [contcodData]);

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

  const columns3 = useMemo(
    () => [
      {
        enableColumnFilter: false,
        header: "SUBIR ARCHIVO",
        filterVariant: "text", // default
        size: 100,
        Cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <SubirPdf />
          </div>
        ),
      },
      {
        enableColumnFilter: false,
        header: "SUBIR ARCHIVO BANCO",
        filterVariant: "text", // default
        size: 100,
        Cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <SubirPdf />
          </div>
        ),
      },
      {
        enableColumnFilter: false,
        accessorKey: "iddesem",
        header: "ID",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "proyecto_id",
        header: "proyecto_id",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "monto_fisico",
        header: "monto_fisico",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "descuento_anti_reten",
        header: "descuento_anti_reten",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "multa",
        header: "multa",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "monto_desembolsado",
        header: "monto_desembolsado",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "tipo_planilla",
        header: "tipo_planilla",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "checklist",
        header: "checklist",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "idcuenta",
        header: "idcuenta",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "estado",
        header: "estado",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fecha_insert",
        header: "fecha_insert",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fecha_update",
        header: "fecha_update",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "id_user",
        header: "id_user",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fecha_generado",
        header: "fecha_generado",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "monto_contrato",
        header: "monto_contrato",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "mes",
        header: "mes",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "gestion",
        header: "gestion",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "id_pago",
        header: "id_pago",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fecha_banco",
        header: "fecha_banco",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "id_user_vobo",
        header: "id_user_vobo",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fecha_vobo",
        header: "fecha_vobo",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fecha_abono",
        header: "fecha_abono",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "proy_cod",
        header: "proy_cod",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "cont_cod",
        header: "cont_cod",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "titr_cod",
        header: "titr_cod",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "ploc_cod",
        header: "ploc_cod",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "numero_inst",
        header: "numero_inst",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "numero_factura",
        header: "numero_factura",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "objeto",
        header: "objeto",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "procesocontratacion",
        header: "procesocontratacion",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "uh",
        header: "uh",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "observacion",
        header: "observacion",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "cite",
        header: "cite",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "archivo",
        header: "archivo",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "open",
        header: "open",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "justificacion_anulacion",
        header: "justificacion_anulacion",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fecha_anulado",
        header: "fecha_anulado",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "id_user_anulacion",
        header: "id_user_anulacion",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "observaciones_pago",
        header: "observaciones_pago",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "archivoxls",
        header: "archivoxls",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "sigepro_id",
        header: "sigepro_id",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "id_dpto",
        header: "id_dpto",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "id_planilla",
        header: "id_planilla",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "Observaciones_Sistemas",
        header: "Observaciones_Sistemas",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "activo",
        header: "activo",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "migrado_fecha_abono",
        header: "migrado_fecha_abono",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "id",
        header: "ID",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "etapa",
        header: "ETAPA",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fechagenerado",
        header: "fechagenerado",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "fechabanco",
        header: "fechabanco",
        filterVariant: "text", // default
        size: 100,
      },
      {
        enableColumnFilter: false,
        accessorKey: "monto_desembolsado",
        header: "monto_desembolsado",
        filterVariant: "text", // default
        size: 100,
      },
    ],
    []
  );

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
        <p className="text-mi-color-primario text-2xl font-bold">
          Generacion Instruccion de Desembolso Vivienda Nueva
        </p>
        <MaterialReactTable
          columns={columns}
          data={datoscontratoData}
          initialState={{ density: "compact", showColumnFilters: true }}
          enableFacetedValues
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              setSelectedContCod(row.original.cont_cod);
            },
            sx: {
              cursor: "pointer",
            },
          })}
        />
      </div>
      {contcodComplejaData.length > 0 && (
        <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
          <p className="text-mi-color-secundario text-2xl font-bold">
            Detalle: {contcodData[0].proy_des}
            {/* Detalle:{contcodData.proy_des} */}
          </p>
          <MaterialReactTable
            columns={columns3}
            data={contcodComplejaData}
            enableFacetedValues
            initialState={{ density: "compact", showColumnFilters: true }}
          />
        </div>
      )}
    </>
  );
};

export default ViviendanuevaTabl;

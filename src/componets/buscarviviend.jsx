"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import { obtenerToken } from "../utils/auth";
import SubirPdf from "./subirpdf";

import Stack from "@mui/material/Stack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const BuscarViviend = () => {
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [contcodData, setContcodData] = useState([]);
  const [contcodComplejaData, setContcodComplejaData] = useState([]);
  const [selectedContCod, setSelectedContCod] = useState(null);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const downloadFile = async (fileName) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/download/${fileName}`;
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, { headers });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error("Error downloading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setBuscar(value);
  };

  const handleSearch = async () => {
    console.log("Realizando la solicitud GET con valores:", buscar);
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/buscar/${buscar}`;
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
            console.log(response.data);
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
            console.log("123");
            console.log(response.data);
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
        size: 50,
      },
      {
        accessorKey: "cont_des",
        header: "PROYECTO",
        size: 50,
      },
      {
        accessorKey: "montocontrato",
        header: "MONTO CONTRATO Bs.",
        size: 50,
      },
      {
        accessorKey: "inst_des",
        header: "EMPRESA",
        size: 50,
      },
      {
        accessorKey: "bole_fechav",
        header: "ULTIMA BOLETA",
        size: 50,
      },
      {
        accessorKey: "etap_cod",
        header: "ESTADO SAP",
        size: 50,
      },
      {
        accessorKey: "depa_des",
        header: "DEPARTAMENTO",
        size: 50,
      },
    ],
    []
  );
  // AEV-PTS-0173
  const columns3 = useMemo(
    () => [
      {
        header: "SUBIR PDF MAE",
        size: 50,
        Cell: ({ row }) => {
          const [showSubirPdf, setShowSubirPdf] = useState(false);

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {showSubirPdf ? (
                <SubirPdf nombreidpdf={row.original.iddesem + "-aev"} />
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    color="error"
                    size="small"
                    endIcon={<UploadFileIcon size="small" />}
                    onClick={() => setShowSubirPdf(true)}
                  ></Button>
                </Stack>
              )}
            </div>
          );
        },
      },

      {
        header: "SUBIR PDF AEV",
        size: 50,
        Cell: ({ row }) => {
          const [showSubirPdf, setShowSubirPdf] = useState(false);

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {showSubirPdf ? (
                <SubirPdf nombreidpdf={row.original.iddesem + "-aev"} />
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    color="error"
                    size="small"
                    endIcon={<UploadFileIcon size="small" />}
                    onClick={() => setShowSubirPdf(true)}
                  ></Button>
                </Stack>
              )}
            </div>
          );
        },
      },

      {
        header: "PDF MAE",
        size: 50,
        Cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                // endIcon={<PictureAsPdfIcon size="small" />}
                color="success"
                endIcon={<SaveAltIcon size="small" />}
                onClick={() => downloadFile(`${row.original.iddesem}-aev`)}
              ></Button>
            </Stack>
            {/* <SubirPdf nombreidpdf={row.original.iddesem + "-mae"} /> */}
          </div>
        ),
      },
      {
        header: "SUBIR PDF BANCO",
        size: 50,
        Cell: ({ row }) => {
          const [showSubirPdf, setShowSubirPdf] = useState(false);

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {showSubirPdf ? (
                <SubirPdf nombreidpdf={row.original.iddesem + "-busa"} />
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    color="error"
                    size="small"
                    endIcon={<UploadFileIcon size="small" />}
                    onClick={() => setShowSubirPdf(true)}
                  ></Button>
                </Stack>
              )}
            </div>
          );
        },
      },

      {
        header: "PDF BAMCO",
        size: 50,
        Cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                color="success"
                // endIcon={<PictureAsPdfIcon size="small" />}
                endIcon={<SaveAltIcon size="small" />}
                onClick={() => downloadFile(`${row.original.iddesem}-busa`)}
              ></Button>
            </Stack>
            {/* <SubirPdf nombreidpdf={row.original.iddesem + "-mae"} /> */}
          </div>
        ),
      },
      {
        accessorKey: "iddesem",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "proyecto_id",
        header: "proyecto_id",
        size: 50,
      },
      {
        accessorKey: "monto_fisico",
        header: "monto_fisico",
        size: 50,
      },
      {
        accessorKey: "descuento_anti_reten",
        header: "descuento_anti_reten",
        size: 50,
      },
      {
        accessorKey: "multa",
        header: "multa",
        size: 50,
      },
      {
        accessorKey: "monto_desembolsado",
        header: "monto_desembolsado",
        size: 50,
      },
      {
        accessorKey: "tipo_planilla",
        header: "tipo_planilla",
        size: 50,
      },
      {
        accessorKey: "checklist",
        header: "checklist",
        size: 50,
      },
      {
        accessorKey: "idcuenta",
        header: "idcuenta",
        size: 50,
      },
      {
        accessorKey: "estado",
        header: "estado",
        size: 50,
      },
      {
        accessorKey: "fecha_insert",
        header: "fecha_insert",
        size: 50,
      },
      {
        accessorKey: "fecha_update",
        header: "fecha_update",
        size: 50,
      },
      {
        accessorKey: "id_user",
        header: "id_user",
        size: 50,
      },
      {
        accessorKey: "fecha_generado",
        header: "fecha_generado",
        size: 50,
      },
      {
        accessorKey: "monto_contrato",
        header: "monto_contrato",
        size: 50,
      },
      {
        accessorKey: "mes",
        header: "mes",
        size: 50,
      },
      {
        accessorKey: "gestion",
        header: "gestion",
        size: 50,
      },
      {
        accessorKey: "id_pago",
        header: "id_pago",
        size: 50,
      },
      {
        accessorKey: "fecha_banco",
        header: "fecha_banco",
        size: 50,
      },
      {
        accessorKey: "id_user_vobo",
        header: "id_user_vobo",
        size: 50,
      },
      {
        accessorKey: "fecha_vobo",
        header: "fecha_vobo",
        size: 50,
      },
      {
        accessorKey: "fecha_abono",
        header: "fecha_abono",
        size: 50,
      },
      {
        accessorKey: "proy_cod",
        header: "proy_cod",
        size: 50,
      },
      {
        accessorKey: "cont_cod",
        header: "cont_cod",
        size: 50,
      },
      {
        accessorKey: "titr_cod",
        header: "titr_cod",
        size: 50,
      },
      {
        accessorKey: "ploc_cod",
        header: "ploc_cod",
        size: 50,
      },
      {
        accessorKey: "numero_inst",
        header: "numero_inst",
        size: 50,
      },
      {
        accessorKey: "numero_factura",
        header: "numero_factura",
        size: 50,
      },
      {
        accessorKey: "objeto",
        header: "objeto",
        size: 50,
      },
      {
        accessorKey: "procesocontratacion",
        header: "procesocontratacion",
        size: 50,
      },
      {
        accessorKey: "uh",
        header: "uh",
        size: 50,
      },
      {
        accessorKey: "observacion",
        header: "observacion",
        size: 50,
      },
      {
        accessorKey: "cite",
        header: "cite",
        size: 50,
      },
      {
        accessorKey: "archivo",
        header: "archivo",
        size: 50,
      },
      {
        accessorKey: "open",
        header: "open",
        size: 50,
      },
      {
        accessorKey: "justificacion_anulacion",
        header: "justificacion_anulacion",
        size: 50,
      },
      {
        accessorKey: "fecha_anulado",
        header: "fecha_anulado",
        size: 50,
      },
      {
        accessorKey: "id_user_anulacion",
        header: "id_user_anulacion",
        size: 50,
      },
      {
        accessorKey: "observaciones_pago",
        header: "observaciones_pago",
        size: 50,
      },
      {
        accessorKey: "archivoxls",
        header: "archivoxls",
        size: 50,
      },
      {
        accessorKey: "sigepro_id",
        header: "sigepro_id",
        size: 50,
      },
      {
        accessorKey: "id_dpto",
        header: "id_dpto",
        size: 50,
      },
      {
        accessorKey: "id_planilla",
        header: "id_planilla",
        size: 50,
      },
      {
        accessorKey: "Observaciones_Sistemas",
        header: "Observaciones_Sistemas",
        size: 50,
      },
      {
        accessorKey: "activo",
        header: "activo",
        size: 50,
      },
      {
        accessorKey: "migrado_fecha_abono",
        header: "migrado_fecha_abono",
        size: 50,
      },
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "etapa",
        header: "ETAPA",
        size: 50,
      },
      {
        accessorKey: "fechagenerado",
        header: "fechagenerado",
        size: 50,
      },
      {
        accessorKey: "fechabanco",
        header: "fechabanco",
        size: 50,
      },
      {
        accessorKey: "monto_desembolsado",
        header: "monto_desembolsado",
        size: 50,
      },
    ],
    []
  );

  return (
    <>
      {/* <SubirPdf /> */}
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <h2 className="p-3 text-mi-color-terceario text-2xl font-bold">
          Buscar
        </h2>
        <div className="col-span-1 flex justify-center md:px-16">
          <TextField
            name="codigo"
            helperText="Ejemplo: AEV-LP-0000 o FASE(XIII)..."
            id="standard-basic"
            label="Codigo de Proyecto o Nombre de Proyecto:"
            variant="standard"
            className="w-full "
            value={buscar}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center pt-5">
          <Button variant="outlined" onClick={handleSearch}>
            <span className="mr-2">Buscar</span>{" "}
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Button>
        </div>
      </div>
      {isDataLoaded && (
        <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
          <p className="text-mi-color-primario text-2xl font-bold">
            Generacion Instruccion de Desembolso Vivienda Nueva
          </p>
          <MaterialReactTable
            // showColumnFilters={false}
            enableHiding={false}
            enableGlobalFilter={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
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
      )}
      <br />
      {contcodComplejaData.length > 0 && (
        <div className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4">
          <p className="text-c1p text-2xl font-bold">
            PROYECTO: {contcodComplejaData[0]?.objeto || ""}
          </p>
          <br />
          <p className="text-c1p text-2xl font-bold">
            CODIGO: {contcodComplejaData[0]?.proy_cod || ""}
          </p>
          <MaterialReactTable
            showColumnFilters={false}
            enableHiding={false}
            enableGlobalFilter={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            // enablePagination={false}
            enableSorting={false}
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

export default BuscarViviend;

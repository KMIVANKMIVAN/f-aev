"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./prism/prism.min.css";
require("./prism/prism.min");
import "./FreezeUI/freeze-ui.min.css";
require("./FreezeUI/freeze-ui.min");

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ButtonGroup from "@mui/material/ButtonGroup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const styles = {
  card: {
    height: "950px", // Establece el ancho deseado
    margin: "auto", // Centra el elemento horizontalmente
  },
};

import { jacobitusTotal } from "./jacobitus-total.es6";

// Declaraciones para evitar errores de tipo
declare function FreezeUI(params: any);
declare function UnFreezeUI();
declare const Prism: any;

export default function Page() {
    const [archivo, setArchivo] = useState<string | undefined>(undefined);
    const [firmas, setFirmas] = useState<string | undefined>(undefined);

    const obtenerBase64 = (file: File): Promise<string | undefined> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString());
        reader.onerror = (error) => reject(error);
      });
    };

    const cargarArchivoBase64 = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        FreezeUI({ text: "Cargando documento" });
        const archivoPdf = await obtenerBase64(event.target.files[0]);
        setArchivo(archivoPdf);
      }
      // UnFreezeUI();
    };

    const firmarPdf = async () => {
      if (archivo) {
        const { value: pin } = await Swal.fire({
          title: "Ingrese su PIN",
          input: "password",
          inputLabel: "PIN",
          inputPlaceholder: "Ingrese su PIN",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
          },
          confirmButtonText: "Aceptar",
          width: "20em",
        });
        if (pin) {
          FreezeUI({ text: "Firmando documento" });
          const slot = 1;
          let respuesta: any =
            await jacobitusTotal.obtenerCertificadosParaFirmaDigital(slot, pin);
          if (
            respuesta.datos?.certificados &&
            respuesta.datos?.certificados.length > 0
          ) {
            const alias = respuesta.datos?.certificados[0].alias;
            respuesta = await jacobitusTotal.firmarPdf(slot, pin, alias, archivo);
            setArchivo(
              `data:application/pdf;base64,${respuesta.datos?.docFirmado}`
            );
            // UnFreezeUI();
          } else {
            UnFreezeUI();
            Swal.fire({
              title: "Jacobitus Total",
              text: respuesta.mensaje,
              icon: "error",
            });
          }
        }
      }
    };

    const firmarPdfModoSeguro = async () => {
      if (archivo) {
        const { value: ci } = await Swal.fire({
          title: "Número de documento",
          input: "text",
          inputLabel: "C.I.",
          inputPlaceholder: "Número de documento",
          confirmButtonText: "Continuar",
          width: "20em",
        });
        if (ci) {
          FreezeUI({ text: "Firmando documento" });
          const respuesta: any = await jacobitusTotal.firmarPdfModoSeguro(
            ci,
            archivo
          );
          if (respuesta.exito) {
            setArchivo(
              `data:application/pdf;base64,${respuesta.datos.docFirmado}`
            );
            // UnFreezeUI();
          } else {
            UnFreezeUI();
            Swal.fire({
              title: "Jacobitus Total",
              text: respuesta.mensaje,
              icon: "error",
            });
          }
        }
      }
    };

    const validarPdf = async () => {
      FreezeUI({ text: "Validando firmas" });
      const respuesta = await jacobitusTotal.validarPdf(archivo);
      setFirmas(JSON.stringify(respuesta.datos?.firmas, null, 4));
      UnFreezeUI();
    };

    useEffect(() => {
      if (firmas) {
        Prism.highlightAll();
      }
    }, []);

    useEffect(() => {
      if (archivo) {
        validarPdf();
      }
    }, [archivo]);

    useEffect(() => {
      if (firmas) {
        Prism.highlightAll();
      }
    }, [firmas]);

    return (
      <>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent style={styles.card}>
                <h1 className="text-center py-2 text-3xl  text-mi-color-primario">
                  Documento PDF
                </h1>
                <h2 className="text-mi-color-primario py-2">
                  Firma de documentos con el Jacobitus Total
                </h2>
                <h3 className="text-mi-color-primario py-2">
                  Seleccione el documento PDF que desea firmar
                </h3>
                <br />
                <div className="flex justify-center items-center flex-col">
                  <input
                    className=" font-bold text-mi-color-primario
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-mi-color-primario file:text-white
                    hover:file:bg-mi-color-terceario"
                    type="file"
                    id="archivo"
                    accept=".pdf"
                    onChange={(event) => cargarArchivoBase64(event)}
                  />
                </div>
                <br />
                <div className="grid grid-cols-12">
                  <div className="col-span-12" style={{ height: "700px" }}>
                    <embed
                      className="form-control"
                      id="archivoPdf"
                      style={{ height: "100%", width: "100%" }}
                      src={archivo}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="pt-5 flex justify-center items-center flex-col">
              <ButtonGroup size="large" aria-label="large button group">
                <Button size="large" onClick={() => firmarPdf()} value="Firmar">
                  Firmar
                </Button>
                <Button
                  size="large"
                  onClick={() => firmarPdfModoSeguro()}
                  value="Firmar (Modo seguro)"
                >
                  Firmar (Modo seguro)
                </Button>
              </ButtonGroup>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent style={styles.card}>
                <h1 className="text-center py-2 text-3xl  text-mi-color-primario">
                  Firmas
                </h1>
                <h2 className="text-mi-color-primario py-2">
                  Validación de firmas en el documento
                </h2>
                <pre
                  className="p-3 language-json"
                  style={{ height: "815px", overflow: "scroll" }}
                >
                  <code
                    id="firmas"
                    dangerouslySetInnerHTML={{ __html: firmas }}
                  ></code>
                </pre>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }

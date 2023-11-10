"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { obtenerToken } from "../utils/auth";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Alert } from "@material-tailwind/react";

const ActualizarUser = ({ userId, urltable }) => {
  console.log("estoy en actualizar");
  console.log(userId);
  console.log("la url llega?");
  console.log(urltable);

  const router = useRouter();
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [userData, setUserData] = useState({
    id: userId,
    username: "",
    superior: "",
    idOficina: "",
    dependencia: "",
    nombre: "",
    cargo: "",
    email: "",
    habilitado: "",
    nivel: "",
    genero: "",
    prioridad: "",
    idEntidad: "",
    super: "",
    cedulaIdentidad: "",
    expedido: "",
  });

  async function fetchUserData() {
    if (!userData.username) {
      const getOneUrl = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/id/${userId}`;

      try {
        const response = await axios.get(getOneUrl, { headers });

        if (response.status === 200) {
          setUserData(response.data);
          console.log("Usuario encontrado correctamente");
        } else {
          console.error("Hubo un error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Hubo un error:", error);
      }
    }
  }

  fetchUserData();

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const updateUrl = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/${userData.id}`;
    try {
      const response = await axios.patch(updateUrl, userData, { headers }); // Use PUT request to update the user

      if (response.data) {
        console.log("SE ACTUALIZÓ CORRECTAMENTE");
        router.push(urltable);
      }
    } catch (error) {
      console.error("HUBO UN ERROR", error);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-amber-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {userData.username !== "" && (
          <form className="space-y-1" onSubmit={handleSubmitUpdate}>
            <DialogTitle id="alert-dialog-title">
              {"ACTUALIZAR USUARIO"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2 gap-4">
                  <div className="">
                    <label htmlFor="username" className="  leading-6">
                      Nombre de Usuario
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="text"
                      value={userData.username}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="nombre" className="  leading-6">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="text"
                      value={userData.nombre}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2 gap-4">
                  <div className="">
                    <label htmlFor="superior" className="  leading-6 ">
                      Superior
                    </label>
                    <input
                      id="superior"
                      name="superior"
                      type="text"
                      autoComplete="text"
                      value={userData.superior}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="nivel" className="  leading-6 ">
                      Nivel
                    </label>
                    <input
                      id="nivel"
                      name="nivel"
                      type="text"
                      autoComplete="text"
                      value={userData.nivel}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2 gap-4">
                  <div className="">
                    <label htmlFor="idOficina" className="  leading-6">
                      ID de Oficina
                    </label>
                    <input
                      id="idOficina"
                      name="idOficina"
                      type="text"
                      autoComplete="text"
                      value={userData.idOficina}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="dependencia" className="  leading-6 ">
                      Dependencia
                    </label>
                    <input
                      id="dependencia"
                      name="dependencia"
                      type="text"
                      autoComplete="text"
                      value={userData.dependencia}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="pb-2">
                  <label htmlFor="cargo" className="  leading-6 ">
                    Cargo
                  </label>
                  <input
                    id="cargo"
                    name="cargo"
                    type="text"
                    autoComplete="text"
                    value={userData.cargo}
                    onChange={handleInputUpdate}
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2 gap-4">
                  <div className="">
                    <label htmlFor="email" className="  leading-6 ">
                      Correo
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="text"
                      value={userData.email}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="habilitado" className="  leading-6 ">
                      Habilitado
                    </label>
                    <input
                      id="habilitado"
                      name="habilitado"
                      type="text"
                      autoComplete="text"
                      value={userData.habilitado}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2 gap-4">
                  <div>
                    <label htmlFor="genero" className="  leading-6 ">
                      Género
                    </label>
                    <select
                      id="genero"
                      name="genero"
                      className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-indigo-600"
                      value={userData.genero}
                      onChange={(e) =>
                        setUserData({
                          ...userData, // Copiar el estado actual
                          genero: e.target.value,
                        })
                      }
                    >
                      <option value="hombre">Masculino</option>
                      <option value="mujer">Femenino</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="idEntidad" className="  leading-6 ">
                      ID Entidad
                    </label>
                    <input
                      id="idEntidad"
                      name="idEntidad"
                      type="text"
                      autoComplete="text"
                      value={userData.idEntidad}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2 gap-4">
                  <div className="">
                    <label htmlFor="cedulaIdentidad" className="  leading-6 ">
                      Cedula de Identidad
                    </label>
                    <input
                      id="cedulaIdentidad"
                      name="cedulaIdentidad"
                      type="text"
                      autoComplete="text"
                      value={userData.cedulaIdentidad}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="expedido" className="leading-6 ">
                      Expendio
                    </label>
                    <select
                      id="expedido"
                      name="expedido"
                      className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-indigo-600"
                      value={userData.expedido}
                      onChange={(e) =>
                        setUserData({
                          ...userData, // Copiar el estado actual
                          expedido: e.target.value,
                        })
                      }
                    >
                      <option value="LPZ">LPZ</option>
                      <option value="OR">OR</option>
                      <option value="CB">CB</option>
                      <option value="CH">CH</option>
                      <option value="SC">SC</option>
                      <option value="BE">BE</option>
                      <option value="PD">PD</option>
                      <option value="PT">PT</option>
                      <option value="TJ">TJ</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2 gap-4">
                  <div className="">
                    <label htmlFor="super" className="  leading-6 ">
                      Super
                    </label>
                    <input
                      id="super"
                      name="super"
                      type="text"
                      autoComplete="text"
                      value={userData.super}
                      onChange={handleInputUpdate}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div></div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                style={{
                  color: "red",
                  fontWeight: "bold", // Aumentamos el grosor del texto
                  // fontSize: "1rem",
                  transition: "color 0.3s", // Agregamos una transición suave
                }}
                onMouseOver={(e) => (e.target.style.color = "darkred")} // Cambiamos el color al pasar el mouse
                onMouseOut={(e) => (e.target.style.color = "red")}
              >
                Cerrar
              </Button>
              <Button
                type="submit"
                onClick={(handleButtonClick, handleClose)}
                style={{
                  color: "green",
                  fontWeight: "bold", // Aumentamos el grosor del texto
                  // fontSize: "1rem",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "darkgreen")}
                onMouseOut={(e) => (e.target.style.color = "green")}
              >
                Guardar
              </Button>
            </DialogActions>
            {expanded && (
              <p
                className="bg-green-600 py-2 md:mx-16 text-center text-white"
                variant="outlined"
              >
                El Usuario Fue Actualizado
              </p>
            )}
          </form>
        )}
      </Dialog>
    </>
  );
};

export default ActualizarUser;

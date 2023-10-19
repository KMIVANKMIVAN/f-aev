"use client";
import React, { useState } from "react";
import axios from "axios";
import { obtenerToken } from "../../../utils/auth";

import ProtectedRoute from "../../../componets/protectedroute";
import NavbarInterna from "../../../componets/navbarinterna";

export default function UpdateUser() {
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    superior: "",
    idOficina: "",
    dependencia: "",
    nombre: "",
    // lastLogin: '',
    // mosca: '',
    cargo: "",
    email: "",
    // logins: '',
    // fechaCreacion: '',
    habilitado: "",
    nivel: "",
    genero: "",
    prioridad: "",
    idEntidad: "",
    super: "",
    cedulaIdentidad: "",
    expedido: "",
    theme: "",
  });

  const [formShear, setFormShear] = useState({
    username: "", // Initialize with an empty string
  });

  const handleInputShear = (e: any) => {
    const { name, value } = e.target;
    setFormShear({ ...formShear, [name]: value });
  };

  // const [userData, setUserData] = useState('');
  const [userData, setUserData] = useState({
    id: "",
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/username/${formShear.username}`;

    try {
      const response = await axios.get(loginUrl, { headers });

      if (response.data) {
        setUserData(response.data);
        console.log("Usuario encontrado correctamente");
      }
    } catch (error) {
      console.error("Hubo un error", error);
      // Handle the error
    }
  };

  const handleInputUpdate = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value }); // Update the userData state with the new value
  };

  const handleSubmitUpdate = async (e: any) => {
    e.preventDefault();
    const updateUrl = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/${userData.id}`;
    try {
      const response = await axios.patch(updateUrl, userData, { headers }); // Use PUT request to update the user

      if (response.data) {
        console.log("SE ACTUALIZÓ CORRECTAMENTE");
      }
    } catch (error) {
      console.error("HUBO UN ERROR", error);
    }
  };

  return (
    <ProtectedRoute>
      <NavbarInterna />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Editar Usuario
        </h2>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="mb-2 text-sm font-medium text-white sr-only dark:text-white"
          >
            Nombre de Usuario
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text" // Change type to text
              id="username"
              name="username" // Add name attribute
              value={formShear.username}
              onChange={handleInputShear}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre de Usuario"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
      {userData.username !== "" && (
        <form className="space-y-1" onSubmit={handleSubmitUpdate}>
          <div className="flex flex-wrap mx-auto  justify-center items-center ">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="username" className="  leading-6">
                Nombre de Usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.username}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="superior" className="  leading-6 ">
                Superior
              </label>
              <div className="mt-2">
                <input
                  id="superior"
                  name="superior"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.superior}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-auto  justify-center items-center ">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="nivel" className="  leading-6 ">
                Nivel
              </label>
              <div className="mt-2">
                <input
                  id="nivel"
                  name="nivel"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.nivel}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="idOficina" className="  leading-6">
                ID de Oficina
              </label>
              <div className="mt-2">
                <input
                  id="idOficina"
                  name="idOficina"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.idOficina}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-auto  justify-center items-center ">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="dependencia" className="  leading-6 ">
                Dependencia
              </label>
              <div className="mt-2">
                <input
                  id="dependencia"
                  name="dependencia"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.dependencia}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="cargo" className="  leading-6 ">
                Cargo
              </label>
              <div className="mt-2">
                <input
                  id="cargo"
                  name="cargo"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.cargo}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-auto  justify-center items-center ">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="email" className="  leading-6 ">
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.email}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="habilitado" className="  leading-6 ">
                Habilitado
              </label>
              <div className="mt-2">
                <input
                  id="habilitado"
                  name="habilitado"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.habilitado}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-auto  justify-center items-center ">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="genero" className="  leading-6 ">
                Género
              </label>
              {/* <div className="mt-2">
                <input
                  id="genero"
                  name="genero"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.genero}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div> */}
              <select
                id="genero"
                name="genero"
                className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-indigo-600"
                required
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
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="idEntidad" className="  leading-6 ">
                ID Entidad
              </label>
              <div className="mt-2">
                <input
                  id="idEntidad"
                  name="idEntidad"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.idEntidad}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-auto  justify-center items-center ">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label
                htmlFor="cedulaIdentidad"
                className="  leading-6 "
              >
                Cedula de Identidad
              </label>
              <div className="mt-2">
                <input
                  id="cedulaIdentidad"
                  name="cedulaIdentidad"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.cedulaIdentidad}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="expedido" className="leading-6 ">
                Expendio
              </label>
              <select
                id="expedido"
                name="expedido"
                className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-indigo-600"
                required
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
          <div className="flex flex-wrap mx-auto  justify-center items-center ">
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
              <label htmlFor="super" className="  leading-6 ">
                Super
              </label>
              <div className="mt-2">
                <input
                  id="super"
                  name="super"
                  type="text"
                  autoComplete="text"
                  required
                  value={userData.super}
                  onChange={handleInputUpdate}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
          </div>

          <div className="flex flex-wrap mx-auto py-3 justify-center items-center">
            <button
              type="submit"
              className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Actualizar Usuario
            </button>
          </div>
        </form>
      )}
    </ProtectedRoute>
  );
}

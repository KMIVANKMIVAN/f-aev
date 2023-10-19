"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import ProtectedRoute from "../../../componets/protectedroute";

import { obtenerToken } from "../../../utils/auth";
import { obtenerUserId } from "../../../utils/userdata";

import { useRouter } from "next/navigation";

import NavbarInterna from "../../../componets/navbarinterna";

export default function updateUserPassword() {
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formShear, setFormShear] = useState({
    username: "",
  });

  const [userData, setUserData] = useState({ password: "", id: "" });
  const [password, setPassword] = useState(""); // Agregar estado para la contraseña
  const [showPassword, setShowPassword] = useState(false); // Controlar la visibilidad de la contraseña

  // const router = useRouter();

  const handleInputShear = (e: any) => {
    const { name, value } = e.target;
    setFormShear({ ...formShear, [name]: value });
  };

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
    }
  };

  const handleInputUpdate = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmitUpdate = async (e: any) => {
    e.preventDefault();
    if (userData) {
      const updateUrl = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/resetpassword/${userData.id}`;
      try {
        const response = await axios.patch(
          updateUrl,
          { password },
          { headers }
        );

        if (response.data) {
          console.log("SE ACTUALIZÓ CORRECTAMENTE");
          // router.push("/ruta-de-redireccion"); // Reemplazar con la ruta de redirección deseada
        }
      } catch (error) {
        console.error("HUBO UN ERROR", error);
      }
    }
  };

  console.log(userData);

  return (
    <ProtectedRoute>
      <NavbarInterna />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
            Actualizar Contraseña de tu Cuenta
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
        {userData.password !== "" && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmitUpdate}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 "
                  >
                    Contraseña
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium leading-6 text-gray-900 hover:text-indigo-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  </button>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de la contraseña
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Actualizar contraseña
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

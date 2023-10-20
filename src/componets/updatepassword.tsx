"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { obtenerToken } from "../utils/auth";

import { useRouter } from "next/navigation";

import { Alert } from "@material-tailwind/react";

export default function UpdatePassword({ userId }) {
  const router = useRouter();
  const passwordId = userId;

  const [formData, setFormData] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = obtenerToken();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/resetpassword/${passwordId}`;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(url, formData, { headers });

      if (response.status === 200) {
        console.log("Contraseña actualizada con éxito");
        router.push("/pages/userstablas");
      } else {
        console.error("Error al actualizar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
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
            required
            value={formData.password}
            onChange={handleInputChange}
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="flex flex-wrap mx-auto py-3 justify-center items-center">
          <button
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            onClick={handleButtonClick}
          >
            {expanded ? "Reseteado" : "Resetear Contraseña"}
          </button>
          {expanded && (
            <Alert
              className="bg-green-600 text-center text-white"
              variant="outlined"
            >
              La Contraseña fue Reseteada
            </Alert>
          )}
          {/* <button
            type="submit"
            className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Resetear Contraseña
          </button> */}
        </div>
      </form>
    </div>
  );
}

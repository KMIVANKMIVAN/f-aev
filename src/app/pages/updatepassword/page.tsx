"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import ProtectedRoute from "../../../componets/protectedroute";

import { obtenerToken } from "../../../utils/auth";
import { obtenerUserId } from "../../../utils/userdata";

import { useRouter } from "next/navigation";

export default function UpdatePassword() {
  const router = useRouter();
  const userId = obtenerUserId();

  const [formData, setFormData] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = obtenerToken();
      const url = `http://localhost:3000/users/updatepassword/${userId}`;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(url, formData, { headers });

      if (response.status === 200) {
        console.log("Contraseña actualizada con éxito");
        router.push("/");
      } else {
        console.error("Error al actualizar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white">
            Actualizar Contraseña de tu Cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 text-white"
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-sm font-medium leading-6 text-gray-900 hover:text-indigo-600 text-white"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      </div>
    </ProtectedRoute>
  );
}

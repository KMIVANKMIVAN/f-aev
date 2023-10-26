"use client";
import React, { useState } from "react";
import axios from "axios";
import { obtenerToken } from "../../../../utils/auth";

export default function RegisterUser() {
  const registerUserUrl = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users`;
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [showPassword, setShowPassword] = useState(false);
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
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(registerUserUrl, formData, { headers });

      if (response.data) {
        console.log("SE REGISTRO CORECTAMENTE");
      }
    } catch (error) {
      console.log("HUBO UN ERROR");
    }
  };

  return (
    <>
    
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Registrar Usuario
        </h2>
      </div>
      <form className="space-y-1" onSubmit={handleSubmit}>
        <div className="flex flex-wrap mx-auto  justify-center items-center ">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
            <label htmlFor="username" className="  leading-6 ">
              Nombre de Usuario
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="text"
                required
                value={formData.username}
                onChange={handleInputChange}
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
                value={formData.superior}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
            <label htmlFor="nombre" className="  leading-6 ">
              Nombres AP. Paterno AP. Materno
            </label>
            <div className="mt-2">
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="text"
                required
                value={formData.nombre}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                value={formData.nivel}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center ">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
            <label htmlFor="password" className="  leading-6 ">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="text"
                autoComplete="text"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
            <label htmlFor="idOficina" className="  leading-6 ">
              ID de Oficina
            </label>
            <div className="mt-2">
              <input
                id="idOficina"
                name="idOficina"
                type="text"
                autoComplete="text"
                required
                value={formData.idOficina}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center">
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
                value={formData.dependencia}
                onChange={handleInputChange}
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
                value={formData.cargo}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center ">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center">
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
                value={formData.email}
                onChange={handleInputChange}
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
                value={formData.habilitado}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center ">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
            <label htmlFor="genero" className="leading-6 ">
              Género
            </label>
            <select
              id="genero"
              name="genero"
              className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-indigo-600"
              required
              value={formData.genero}
              onChange={(e) =>
                setFormData({
                  ...formData, // Copiar el estado actual
                  genero: e.target.value,
                })
              }
            >
              <option value="Seleccionar">Seleccionar</option>
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
                value={formData.idEntidad}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center ">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
            <label htmlFor="cedulaIdentidad" className="  leading-6 ">
              Cedula de Identidad
            </label>
            <div className="mt-2">
              <input
                id="cedulaIdentidad"
                name="cedulaIdentidad"
                type="text"
                autoComplete="text"
                required
                value={formData.cedulaIdentidad}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
            <label htmlFor="expedido" className="leading-6 ">
              Expendio
            </label>
            <select
              id="expedido"
              name="expedido"
              // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-indigo-600"
              required
              value={formData.expedido}
              onChange={(e) =>
                setFormData({
                  ...formData, // Copiar el estado actual
                  expedido: e.target.value,
                })
              }
            >
              <option value="Seleccionar">Seleccionar</option>
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
        <div className="flex flex-wrap mx-auto  justify-center items-center">
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
                value={formData.super}
                onChange={handleInputChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
        </div>
        <div className="flex flex-wrap mx-auto  justify-center items-center">
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
          <div className=" w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"></div>
        </div>
        <div className="flex flex-wrap mx-auto py-3 justify-center items-center">
          <button
            type="submit"
            className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Registrar Usuario
          </button>
        </div>
      </form>
    </>

      
  );
}

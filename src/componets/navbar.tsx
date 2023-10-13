"use client";
import React from "react";
import { useRouter } from "next/router";
import { eliminarToken } from "../utils/auth";
export default function Navbar() {

  const handleLogout = async () => {
    eliminarToken();
    window.location.href = "/";
  };

  return (
    <div className="flex bg-white flex-row">
      <div className="basis-1/2 bg-slate-500">
        <img src="/LogotipoAEV.png" alt="" />
      </div>
      <div className="flex text-blue-900 font-bold items-center basis-1/2 bg-white flex-row-reverse">
        <button className="p-2" onClick={handleLogout}>
          Salir
        </button>
        <button className="p-2">Sobre Nosotros</button>
        <button className="p-2">Contactos</button>
        <button className="p-2">Iniciar Sesion</button>
      </div>
    </div>
  );
}

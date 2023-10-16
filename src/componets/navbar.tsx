"use client";
import React from "react";
import { eliminarToken } from "../utils/auth";

export default function Navbar() {
  const handleLogout = async () => {
    eliminarToken();
    window.location.href = "/";
  };

  return (
    <div className="bg-contain bg-center bg-white border-b-2 border-gray-600 ">
      <img src="/LogotipoAEV.png" alt="icon" className="w-100 mx-auto" />
    </div>
  );
}

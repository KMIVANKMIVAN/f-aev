"use client";
import React from "react";
import { eliminarToken } from "../utils/auth";

export default function Navbar() {
  const handleLogout = async () => {
    eliminarToken();
    window.location.href = "/";
  };

  return (
    <div className="bg-contain bg-center  ">
      <img src="/LogotipoAEV.png" alt="icon" className="w-100 mx-auto" />
    </div>
  );
}

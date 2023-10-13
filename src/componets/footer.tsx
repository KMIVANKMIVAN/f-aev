"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div className="grow p-5 text-center bg-white font-bold text-blue-900">
      Copyright © 2023 - Agencia Estatal de Vivienda, Actualizado a Octubre 2023
    </div>
  );
}

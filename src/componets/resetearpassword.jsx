"use client";
import React, { useState } from "react";
import axios from "axios";
import { obtenerToken } from "../utils/auth";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const ResetearPassword = ({ userId, urltable }) => {
  console.log("estoy en actualizar");
  console.log(userId);
  console.log("la url llega?");
  console.log(urltable);

  const router = useRouter();
  const passwordId = userId;

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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/resetpassword/${passwordId}`;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(url, formData, { headers });

      if (response.status === 200) {
        router.push(urltable);
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
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
          />
        </svg>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-title">
            {"RESETAR CONTRASEÑA"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{
                color: "red",
                fontWeight: "bold",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "darkred")}
              onMouseOut={(e) => (e.target.style.color = "red")}
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              onClick={(handleButtonClick, handleClose)}
              style={{
                color: "green",
                fontWeight: "bold",
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
      </Dialog>
    </>
  );
};

export default ResetearPassword;

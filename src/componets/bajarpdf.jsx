"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { obtenerToken } from "../utils/auth";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BajarPdf = ({ nombreidpdf }) => {
  const downloadFile = async (fileName) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/documentpdf/download/${fileName}`;
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, { headers });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error("Error downloading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          size="small"
          // endIcon={<PictureAsPdfIcon size="small" />}
          color="success"
          endIcon={<SaveAltIcon size="small" />}
          onClick={() => downloadFile(nombreidpdf)}
        ></Button>
      </Stack>
    </>
  );
};

export default BajarPdf;

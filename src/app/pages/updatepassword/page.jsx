"use client";
import React, { useState } from "react";
import UpdatePassword from "../../../componets/updatepassword";
import ProtectedRoute from "../../../componets/protectedroute";

export default function Home() {
  return (
    <ProtectedRoute>
      <UpdatePassword />
    </ProtectedRoute>
  );
}

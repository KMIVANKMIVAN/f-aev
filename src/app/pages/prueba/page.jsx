"use client";
import React, { useState } from "react";
import { useUsersStore } from "../../../store/users";

import Pruebas from "../pruebas/page";

const Prueba = () => {
  const { addUser } = useUsersStore(); // Aquí puede estar el error
  const [name, setName] = useState("");
  console.log("name", name);

  const handleInput = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const addToStore = (e) => {
    e.preventDefault();
    addUser({ name: name });
    setName("");
  };

  return (
    <>
      <form onSubmit={addToStore}>
        <input type="text" onChange={handleInput} value={name} />
        <button type="submit">ADD</button>
      </form>
      <Pruebas />
    </>
  );
};

export default Prueba;

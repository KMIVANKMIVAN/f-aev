"use client";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../GlobalRedux/counter/counterSlice";
import React, { useState } from "react";
import { useUsersStore } from "../../../store/users";

import Pruebas from "../pruebas/page";

const Prueba = () => {
  //useSelector gets the state from store
  const count = useSelector((state) => state.counter.value); // Access the counter state

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();

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
      <div>
        <h1>Counter: {count}</h1> {/* Display the counter state */}
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
      <form onSubmit={addToStore}>
        <input type="text" onChange={handleInput} value={name} />
        <button type="submit">ADD</button>
      </form>
      <Pruebas />
    </>
  );
};

export default Prueba;

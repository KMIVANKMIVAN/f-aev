"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
} from "../../../GlobalRedux/counter/counterSlice";
import React, { useState } from "react";
// import Prueba1 from "../../../../componets/Prueba1";

const Prueba2 = () => {
  //useSelector gets the state from store
  const count = useSelector((state) => state.counter.value); // Access the counter state

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <br />
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <br />
        <h1>Counter: {count}</h1>
        {/* <Prueba1 /> */}
      </div>
    </>
  );
};

export default Prueba2;

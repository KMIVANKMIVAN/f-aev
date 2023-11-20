"use client";
import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "../app/GlobalRedux/";
import React, { useState } from "react";


const Prueba1 = () => {
  //useSelector gets the state from store
  const count = useSelector((state) => state.counter.value); // Access the counter state

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();

 
  return (
    <>
      <div>
        <h1>Counter: {count}</h1> {/* Display the counter state */}
      </div>
    </>
  );
};

export default Prueba1;

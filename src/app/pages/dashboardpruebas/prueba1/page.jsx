"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
} from "../../../GlobalRedux/counter/counterSlice";
import React, { useState } from "react";

import SubirPdf from "../../../../componets/subirpdf";

const Prueba1 = () => {
  //useSelector gets the state from store
  const count = useSelector((state) => state.counter.value); // Access the counter state

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();

  const [showSubirPdf, setShowSubirPdf] = useState(false);

  const toggleSubirPdf = () => {
    setShowSubirPdf((prevShowSubirPdf) => !prevShowSubirPdf); // Alternar el estado actual
  };
  return (
    <>
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={toggleSubirPdf}>Renderizar SubirPdf</button>
        {showSubirPdf && <SubirPdf onClose={() => setShowSubirPdf(false)} />}
      </div>
    </>
  );
};

export default Prueba1;

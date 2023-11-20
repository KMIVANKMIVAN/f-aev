// import { useClient } from "next/client";
"use client";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../GlobalRedux/counter/counterSlice";
import React, { useMemo, useState, useEffect } from "react";

import { useUsersStore } from "../../../store/users";

const Pruebas = () => {
  const count = useSelector((state) => state.counter.value); // Access the counter state

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();
  const { users } = useUsersStore();
  return (
    <>
      <div>
        <h1>Counter: {count}</h1>

        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <pre style={{ background: "red" }}>{JSON.stringify(users)}</pre>
        <ul>
          {users.map((u) => {
            return <li key={u.name}>{u.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Pruebas;

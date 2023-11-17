"use client";
import React, { useMemo, useState, useEffect } from "react";

import { useUsersStore } from "../../../store/users";

const Pruebas = () => {
  const { users } = useUsersStore();
  return (
    <>
      <div>
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

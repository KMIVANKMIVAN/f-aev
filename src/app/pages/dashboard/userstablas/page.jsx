"use client";
import React, { useState, useEffect } from "react";
import UserTablaComponet from "../../../../componets/usertablacomponent";

const UsersTablas = () => {
  const urltable = "/pages/dashboard/usertablas";
  const [showUserTabla, setShowUserTabla] = useState(false);

  const toggleUserTabla = () => {
    setShowUserTabla(!showUserTabla);
  };

  return (
    <>
      <button onClick={toggleUserTabla}>Mostrar UserTablaComponet</button>
      {showUserTabla && <UserTablaComponet urltable={urltable} />}
    </>
  );
};

export default UsersTablas;

"use client";
import React, { useState } from "react";

export default function Prueba() {
  const [expanded, setExpanded] = useState(false);

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <button className="bg-black text-white" onClick={handleButtonClick}>
        {expanded ? "Contraer" : "Expandir"}
      </button>
      {expanded && <div>Contenido Expandido</div>}
    </div>
  );
}

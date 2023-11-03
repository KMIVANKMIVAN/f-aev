"use client";
import React, { useState, useEffect } from "react";

import UserTablaComponet from "../../../../componets/usertablacomponent";

const UserTablas = () => {
  const urltable = "/pages/dashboard/userstablas";

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        
      </div>
      <UserTablaComponet urltable={urltable} />
    </>
  );
};

export default UserTablas;

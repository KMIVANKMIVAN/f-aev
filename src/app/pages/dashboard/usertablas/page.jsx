"use client";
import React, { useState, useEffect } from "react";

import UserTablaComponet from "../../../../componets/usertablacomponent";

const UserTablas = () => {

  const urltable = "/pages/dashboard/userstablas";

  return (
    <>
      <UserTablaComponet urltable={urltable}/>
    </>
  );
};

export default UserTablas;

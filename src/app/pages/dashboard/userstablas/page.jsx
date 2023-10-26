"use client";
import React, { useState, useEffect } from "react";

import UserTablaComponet from "../../../../componets/usertablacomponent";

const UsersTablas = () => {

  const urltable = "/pages/dashboard/usertablas";

  return (
    <>
      <UserTablaComponet urltable={urltable}/>
    </>
  );
};

export default UsersTablas;

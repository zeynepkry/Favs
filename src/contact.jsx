import React, { useState } from "react";
import { Form } from "react-router-dom";
import { DatePicker } from 'antd';

export default function User() {


  const user = {
    pp: "https://placekitten.com/g/200/200",
  };

  return (
    <div id="user">
      <div>
        <img
          key={user.pp}
          src={user.pp || null}
          alt="Avatar"
        />
      </div>
    </div>
    
  );
}

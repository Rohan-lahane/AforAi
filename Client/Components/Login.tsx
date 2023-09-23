"use client";
import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div>
      click here to get started :
      <button onClick={() => signIn("google")}>Login</button>
    </div>
  );
};

export default Login;

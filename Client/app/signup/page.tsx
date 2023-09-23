"use client";
import React from "react";
import { useState, useEffect } from "react";
import authservice from "../../Services/handleapi";
import Login from "@/Components/Login";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUpPage = () => {
  //   const router = useRouter();

  return (
    <div>
      <Link href="/">back </Link>
      <Login />
    </div>
  );
};

export default SignUpPage;

'use client'

import { useState } from "react";
import AuthLogin from "@/components/loginComponent";
import AuthRegister from "@/components/registerComponent";
import AuthLayout from "./layout";

const Auth = () => {
  const [onRegister, setOnRegister] = useState<boolean>(true);

  return (
    <>
      { onRegister 
        ? <AuthRegister setOnRegister={setOnRegister} />
        : <AuthLogin setOnRegister={setOnRegister} />
      }
    </>
  )
}

export default Auth;

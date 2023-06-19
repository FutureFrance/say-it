'use client'

import { useState } from "react";
import AuthLogin from "@/components/auth/login";
import AuthRegister from "@/components/auth/register";

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

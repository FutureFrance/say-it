'use client'

import { useState } from "react";
import AuthLogin from "@/components/auth/login";
import AuthRegister from "@/components/auth/register";

const Auth = () => {
  const [onLogin, setOnLogin] = useState<boolean>(true);

  return (
    <>
      { onLogin
        ? <AuthLogin setOnLogin={setOnLogin} />
        : <AuthRegister setOnLogin={setOnLogin} />
      }
    </>
  )
}

export default Auth;

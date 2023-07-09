'use client'

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { IAuthFormProps } from "@/types/authForm.type";
import { loginFormType, loginSchema } from "@/validations/authForm";
import InputLabel from "@/components/Inputs/label";
import Input from "@/components/Inputs/input";
import ErrorTimeout from "@/components/ui/errors/errorTimeout";
import OAuthGoogle from "@/components/buttons/oauthGoogle";
import PopUpMessage from "../ui/errors/popUpMessage";

const initialFormState = { email: undefined, password: undefined };
const inputStyles = 'border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 block dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full h-[33px] font-medium text-gray-900 text-sm';
const labelStyles = 'block mb-2 text-xs font-medium text-gray-900 dark:text-black';

export const AuthLogin = ({ setOnLogin }: IAuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<loginFormType>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const handleValidationErrors = (err: ZodError) => {
    const placeholder: loginFormType = { ...initialFormState };
    
    err.issues.forEach((element) => {
      if (element.path[0]) { 
        placeholder[(element.path[0]) as keyof loginFormType] = (element.message);
      }
    });

    setErrors(prevErrors => ({ ...prevErrors, ...placeholder }));
  }

  const handleSumbit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const payload = {
        email,
        password
      }

      loginSchema.parse(payload);

      const authResponse = await signIn("credentials", {
        ...payload,
        callbackUrl: `/feed`,
        redirect: false,
      });
      console.log(authResponse)
      if (authResponse?.error) throw authResponse?.error;

      router.push('/feed');
    } catch(err: any) {
      if (err instanceof ZodError) {
        handleValidationErrors(err);
      } else if (err instanceof AxiosError) {
        setApiError(err.response?.data.message);
      } 
    }
  }

  return (
    <>
    <h1 className='text-xl font-black leading-tight tracking-tight md:text-2xl dark:text-black mb-8'>Log in your account</h1>

    <form onSubmit={handleSumbit} className='flex flex-col space-y-4 md:space-y-6 mb-4'>
      <div>
        <InputLabel 
          htmlFor="email"
          labelText="Email: "
          styles={labelStyles}
        />

        <Input 
          id="email"
          type="email"
          placeholder={email}
          setPlaceholder={setEmail}
          styles={inputStyles}
        />
        { errors?.email && <ErrorTimeout timeout={8000} error={errors.email} setError={setErrors} /> }
      </div>
      
      <div>
        <InputLabel 
          htmlFor="password"
          labelText="Password: "
          styles={labelStyles}
        />

        <Input 
          id="password"
          type="password"
          placeholder={password}
          setPlaceholder={setPassword}
          styles={inputStyles}
        />
         { errors?.password && <ErrorTimeout timeout={8000} error={errors.password} setError={setErrors} /> }
      </div>

      <button type="submit" className='bg-[#2563aa] text-xs text-white font-semibold text-sm py-3 mx-max'>Log in</button>
    </form>

    <OAuthGoogle text='Sign up with google'/>

    <p className="text-[15px]">Don't have an account ? 
      <span 
        className='text-blue-500 text-xs hover:cursor-pointer transition duration-300 hover:underline'
        onClick={() => setOnLogin(true)}
      >
        Register
      </span>
    </p>

    { apiError && 
      <PopUpMessage 
        text={apiError} 
        setText={setApiError}
        iconSrc="/assets/error_info.png"
      /> 
    }
    </>
  )
}

export default AuthLogin;
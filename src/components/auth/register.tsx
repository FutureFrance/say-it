'use client'

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { registerFormType, registerSchema } from '@/validations/authForm';
import { IAuthFormProps } from '@/types/authForm.type';
import ErrorTimeout from '@/components/ui/errors/errorTimeout';
import Input from '@/components/inputs/input';
import InputLabel from '@/components/inputs/label';
import { checkUsernameAvailability, register } from '@/services/auth.service';
import { signIn } from 'next-auth/react';
import PopUpMessage from '../ui/errors/popUpMessage';
import { useDebounce } from '@/hooks/useDebounce';

const initialFormState = {
  name: undefined, username: undefined, email: undefined, password: undefined, confirm_password: undefined
}

const inputStyles = 'border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 block dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full h-[33px] font-medium text-gray-900 text-sm';
const labelStyles = 'block mb-2 text-xs font-medium text-gray-900 dark:text-black';

export const AuthRegister = ({ setOnLogin }: IAuthFormProps ) => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);
  const [errors, setErrors] = useState<registerFormType>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const debouncedValue = useDebounce(username);

  const router = useRouter();

  useEffect(() => {
    usernameAvailability();
  }, [debouncedValue]);

  const usernameAvailability = async () => {
    try {
      if (username.length === 0) return;

      const response = await checkUsernameAvailability(username);

      setIsUsernameAvailable(response.data.available);
    } catch(err) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  } 

  const handleValidationErrors = (err: ZodError) => {
    const placeholder: registerFormType = { ...initialFormState };
    
    err.issues.forEach((element) => {
      if (element.path[0]) { 
        placeholder[(element.path[0]) as keyof registerFormType] = (element.message);
      }
    });

    setErrors(prevErrors => ({ ...prevErrors, ...placeholder }));
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    try {
      if (!isUsernameAvailable) return;

      const payload = {
        name, 
        username,
        email,
        password,
      }

      registerSchema.parse({ ...payload, confirm_password });

      await register(payload);
      
      await signIn("credentials", {
        ...payload,
        callbackUrl: `/feed`,
        redirect: false,
      });
      router.push('/feed');
    } catch(err) {
      if (err instanceof ZodError) {
        handleValidationErrors(err);
      } else if (err instanceof AxiosError) {
        setApiError(err.response?.data.message);
      }
    }
  } 

  const handleOAuthGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/feed' }); 
    } catch(err: any) {
      setApiError(err);
    }
  }

  return (
    <>
      <p className='text-3xl font-black leading-tight tracking-tight md:text-2xl dark:text-black mb-8'>Register an account</p>

      <form onSubmit={handleSubmit} className='flex flex-col space-y-4 md:space-y-6 mb-2'>
        <div className='w-72'>
          <InputLabel 
            htmlFor='name'
            labelText='Name:'
            styles={labelStyles}
          />
          <Input 
            id='name' 
            type='text' 
            placeholder={name} 
            setPlaceholder={setName} 
            styles={inputStyles}
          />
          { errors?.name && <ErrorTimeout timeout={8000} error={errors.name} setError={setErrors}/> }
        </div>

        <div className='w-72'>
          <InputLabel 
            htmlFor='username'
            labelText='Username:'
            styles={labelStyles}
          /> 
          <Input 
            id='username' 
            type='text' 
            placeholder={username} 
            setPlaceholder={setUsername}
            styles={inputStyles}
          />
          { username.length > 0 &&
            <>
              {
                !isUsernameAvailable 
                  ? <div className='flex gap-2 items-center mt-2'>
                      <img 
                        className='w-[10px] h-[10px]' 
                        src="/assets/error_info.png" 
                        alt="err_icon"
                      /> 
                      <p className='text-[red] text-xs'>This username is taken</p> 
                    </div>
                  : <p className='text-[blue] text-xs mt-2'>This username is available</p> 
              }
            </>
          }
          { errors?.username && <ErrorTimeout timeout={9000} error={errors.username} setError={setErrors} /> }
        </div>
        
        <div className='w-72'>
          <InputLabel 
            htmlFor='email'
            labelText='Email:'
            styles={labelStyles}
          />
          <Input 
            id='email' 
            type='email' 
            placeholder={email} 
            setPlaceholder={setEmail}
            styles={inputStyles}
          />
          { errors?.email && <ErrorTimeout timeout={10000} error={errors.email} setError={setErrors} /> }
        </div>

        <div className='w-72'>
          <InputLabel 
            htmlFor='password'
            labelText='Password:'
            styles={labelStyles}
          />
          <Input 
            id='password' 
            type='password' 
            placeholder={password} 
            setPlaceholder={setPassword}
            styles={inputStyles}
          />
          { errors?.password && <ErrorTimeout timeout={11000} error={errors.password} setError={setErrors} /> }
        </div>

        <div className='w-72'>
          <InputLabel 
            htmlFor='repeated_password'
            labelText='Repeated Password:'
            styles={labelStyles}
          />
          <Input 
            id='repeated_password' 
            type='password' 
            placeholder={confirm_password} 
            setPlaceholder={setConfirmPassword}
            styles={inputStyles}
          />
          { errors?.confirm_password && <ErrorTimeout timeout={12000} error={errors.confirm_password} setError={setErrors} />}
        </div>

        <button type='submit' className='bg-[#2563aa] text-xs text-white font-semibold text-sm py-3 mx-max'>Register an account</button>
      </form>
      
      <div className='w-full inline-block text-center border-[3px] border-black-400 py-1 mb-[10px] cursor-pointer' 
        onClick={handleOAuthGoogle}  
      >
        <div className='flex items-center'>
          <img className='ml-[7%] w-[25px] h-[25px]' src="/assets/google_logo_oauth.png" alt="google_logo" />
          <div className='w-[100%] flex justify-center'>
            <p className='max-w-max max-h-min p-0 text-sm font-medium text-slate-700'>Sign up with google</p>
          </div>
        </div>
      </div>

      <p className='text-sm'>Have an account ? &nbsp;
        <span 
          className='text-blue-500 text-xs hover:cursor-pointer transition duration-300 hover:underline'
          onClick={() => setOnLogin(true)}  
        >
          Log in
        </span>
      </p>

      { apiError && 
      <PopUpMessage 
        text={apiError} 
        setText={setApiError}
        success={false}
        textColor='rose-400'
      /> 
    }
    </>
  )
}

export default AuthRegister;
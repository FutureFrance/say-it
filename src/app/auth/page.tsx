'use client'

import { FormEvent, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import Input from '@/components/inputComponent';
import InputLabel from '@/components/labelComponent';

const registerSchema = z.object({
  first_name: z.string().trim(),
  last_name: z.string().trim(),
  email: z.string().email().trim(),
  password: z.string().min(8)
})

const inputStyle = 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full h-[33px]'

export const Auth = () => {
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeated_password, setRepeatedPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      registerSchema.parse({
        first_name, 
        last_name,
        email,
        password
      })

      const response = await axios.post('http://localhost:3001/api/auth/register');

      console.log('asdfas', response.data)
    } catch(err) {
      console.log(err);
    }
  } 

  return (
    <section className='bg-gray-50 dark:bg-gray-900 h-screen flex'>
      <div className='px-[50px] py-8 m-auto bg-white shadow max-w-[500px]'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10'>Register an account</h1>

        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 md:space-y-6'>
          <div>
            <InputLabel 
              htmlFor='first_name'
              labelText='First Name:'
              styles='block mb-2 text-base font-small text-gray-900 dark:text-white'
            />
            <Input 
              id='first_name' 
              type='text' 
              placeholder={first_name} 
              setPlaceholder={setFirstName} 
              styles={inputStyle}
            />
          </div>

          <div className='w-96'>
            <InputLabel 
              htmlFor='last_name'
              labelText='Last Name:'
              styles='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            />
            <Input 
              id='last_name' 
              type='text' 
              placeholder={last_name} 
              setPlaceholder={setLastName}
              styles={inputStyle}
            />
          </div>
          
          <div>
            <InputLabel 
              htmlFor='email'
              labelText='Email:'
              styles='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            />
            <Input 
              id='email' 
              type='text' 
              placeholder={email} 
              setPlaceholder={setEmail}
              styles={inputStyle}
            />
          </div>

          <div>
            <InputLabel 
              htmlFor='password'
              labelText='Password:'
              styles='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            />
            <Input 
              id='password' 
              type='password' 
              placeholder={password} 
              setPlaceholder={setPassword}
              styles={inputStyle}
            />
          </div>

          <div className='w-50'>
            <InputLabel 
              htmlFor='repeated_password'
              labelText='Repeated Password:'
              styles='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            />
            <Input 
              id='repeated_password' 
              type='password' 
              placeholder={repeated_password} 
              setPlaceholder={setRepeatedPassword}
              styles={inputStyle}
            />
          </div>

          <button type='submit' className='bg-[#2563eb] text-white font-bold text-sm py-3 px-20 rounded-[12px] border-sm w-[calc(100%_-_theme(spacing.16))] mx-auto'>Register an account</button>
        </form>
      </div>
    </section>
  )
}

export default Auth;
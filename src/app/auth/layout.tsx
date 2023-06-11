import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className='bg-gray-30 dark:bg-gray-800 h-screen flex'>
      <div className='px-[50px] py-8 m-auto bg-white shadow max-w-[500px]'>
        {children}
      </div>
    </section>
  )
}

export default AuthLayout;
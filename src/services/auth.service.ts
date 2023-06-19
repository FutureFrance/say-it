import { IUser } from "@/interfaces/user.interface";
import { loginFormType, registerFormType } from "@/validations/authForm";
import axios from "axios";

export const register = async (body: Required<Omit<registerFormType, 'confirm_password'>>) => {
  return await axios
      .post<void>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, body)
      .then(res => {
        return res?.data;
      })
      .catch(e => {
        throw e;
      });
}

export const login = async (body: Required<loginFormType>) => {
  return await axios
      .post<string>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, body)
      .then(res => {
        return res?.data;
      })
      .catch(e => {
        throw e;
      })
}

export const getUserInfo = async (accessToken: string) => {
  return await axios
    .get<IUser>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/info`, { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res?.data;
    })
    .catch(e => {
      throw e;
    })
}
import { loginFormType, registerFormType } from "@/validations/authForm";
import axios from "axios";

export const register = async (body: Required<Omit<registerFormType, 'confirm_password'>>) => {
  return await axios
      .post<void>(`${process.env.API_URL}/api/auth/register`, body)
      .then(res => {
        return res?.data;
      })
      .catch(e => {
        throw e;
      });
}

export const login = async (body: Required<loginFormType>) => {
  return await axios
      .post<void>(`${process.env.API_URL}/api/auth/login`, body)
      .then(res => {
        return res?.data;
      })
      .catch(e => {
        throw e;
      })
}
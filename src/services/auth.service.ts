import { IUser } from "@/interfaces/user.interface";
import { api } from "@/lib/http";
import { loginFormType, registerFormType } from "@/validations/authForm";

export const register = async (body: Required<Omit<registerFormType, 'confirm_password'>>) => {
  return await api
      .post<void>('/auth/register', body)
      .then(res => {
        return res?.data;
      })
      .catch(e => {
        throw e;
      });
}

export const login = async (body: Required<loginFormType>) => {
  return await api
      .post<string>('/auth/login', body)
      .then(res => {
        return res?.data;
      })
      .catch(e => {
        return null;
      })
}

export const getUserInfo = async (accessToken: string) => {
  return await api
    .get<IUser>('/auth/info', { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res?.data;
    })
    .catch(e => {
      throw e;
    })
}
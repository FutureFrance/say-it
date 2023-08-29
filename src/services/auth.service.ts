import { api } from "@/lib/http";
import { IUser } from "@/types/user.interface";
import { loginFormType, registerFormType } from "@/validations/authForm";

export const register = async (body: Required<Omit<registerFormType, 'confirm_password'>>) => {
  return await api
      .post<void>('/auth/register', body)
      .then(res => {
        return res?.data;
      })
      .catch(err => {
        throw err;
      });
}

export const login = async (body: Required<loginFormType>) => {
  return await api
      .post<string>('/auth/login', body)
      .then(res => {
        return res?.data;
      })
      .catch(err => {
        throw err;
      })
}

export const handleOAuth = async (body: { first_name: string, last_name: string, email: string, avatar: string }) => {
  return await api
    .post('/auth/oauth', body)
    .then(res => {
      return res
    })
    .catch(err => {
      throw err
    });
}

export const getAuthInfo = async (accessToken: string) => {
  return await api
    .get<IUser>('/auth/info', { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err;
    })
}

export const checkUsernameAvailability = async (username: string) => {
  return await api
  .get<{ available: boolean }>(`/auth/available/username?username=${username}`)
  .then(res => {
    return res;
  })
  .catch(err => {
    throw err;
  })
}
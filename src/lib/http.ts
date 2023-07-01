
import { getSession } from 'next-auth/react';
import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  //withCredentials: true
});

export const axiosAuthHeader = async (token: string | undefined = undefined) => {
  const authToken = token
    ? token 
    : (await getSession())?.accessToken;

  return {
    Authorization: `Bearer ${authToken}`,
  };
};

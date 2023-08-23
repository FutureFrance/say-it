import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  //withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => { 
    const { status } = error.response;

    if (status === 401) {
      if (typeof window === 'undefined') {
        error.response.statusCode = 302;
        error.response.headers.Location = '/auth';
      } else {
        window.location.href = '/auth';
      }
    }

    return Promise.reject(error);
  }
);

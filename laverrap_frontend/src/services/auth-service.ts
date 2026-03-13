import { AUTH_STORAGE_KEY } from "@/utils/consts";
import { api } from "./api";
const LOGIN_URL = "/auth/login";
export const authService = {
  login: async ({ email, password }: { email:string, password:string }) => {
    const { data } = await api.post(LOGIN_URL, { email, password });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.data));
    return data;
  },
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
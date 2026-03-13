import { api } from "@/services";
import { AUTH_STORAGE_KEY } from "@/utils/consts";
import type { InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const axiosInterceptor = () => {
  const updateHeader = (request: InternalAxiosRequestConfig) => {
    const userLocalStorage = localStorage.getItem(AUTH_STORAGE_KEY);
    const token = userLocalStorage ? JSON.parse(userLocalStorage).token : null;
    const newHeaders = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    request.headers.set("Authorization", newHeaders.Authorization);
    request.headers.set("Content-Type", newHeaders["Content-Type"]);
    return request;
  };
  // Agregar un interceptor a la petición
  api.interceptors.request.use(function (request) {
  // Haz algo antes que la petición se ha enviada
    console.log("INTERCEPTOR DE PETICIÓN", request);
    return updateHeader(request);
  }, function (error) {
  // Haz algo con el error de la petición
    return Promise.reject(error);
  });

  // Agregar una respuesta al interceptor
  api.interceptors.response.use(function (response) {
  // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función 
  // Haz algo con los datos de la respuesta
    return response;
  }, function (error) {
  // Cualquier código de estado que este fuera del rango de 2xx causa la ejecución de esta función
  // Haz algo con el error
    const status = error.response?.status;
    console.log("ERROR CAPTURADO EN EL INTERCEPTOR", error.response);
    if(status === 401 || status === 403) {
      toast.error("No tienes permisos para realizar esta acción");
      return Promise.reject(new Error("Credenciales inválidas"));
    }
    if(status === 500) {
      toast.error("Error en el servidor, intenta nuevamente más tarde");
      return Promise.reject(new Error("Error en el servidor"));
    }
    if(!status) {
      toast.error("Error de red, verifica tu conexión");
    }
    return Promise.reject(error);
  });
};

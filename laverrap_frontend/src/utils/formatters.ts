import type { ServiceCategory, Washing } from "@/types";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);

export const formatTime = (isoString: string) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
};

export const formatWashingStatus: Record<Washing["status"], string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En Progreso",
  COMPLETED: "Completado",
  CANCELED: "Cancelado"
};

export const formatServiceCategory: Record<ServiceCategory, "Básico" | "Completo" | "Premium" | "Otra"> = {
  BASIC: "Básico",
  COMPLETE: "Completo",
  PREMIUM: "Premium",
  OTHER: "Otra"
};
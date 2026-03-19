import { BubblesIcon, LayoutDashboardIcon, ShowerHeadIcon, UserCogIcon, Users2Icon, type LucideIcon } from "lucide-react";
import { PRIVATE_ROUTES } from "./routes";
export const AUTH_STORAGE_KEY = "auth_user";
export const NAVBAR_LINKS: { id: number; title: string; path: string; icon: LucideIcon }[] = [
  {
    id: 1,
    title: "Dashboard",
    path: PRIVATE_ROUTES.DASHBOARD.path,
    icon: LayoutDashboardIcon
  },
  {
    id: 2,
    title: "Lavados",
    path: PRIVATE_ROUTES.WASHED.path,
    icon: ShowerHeadIcon
  },
  {
    id: 3,
    title: "Clientes",
    path: PRIVATE_ROUTES.CLIENTS.path,
    icon:Users2Icon
  },
  {
    id: 4,
    title: "Empleados",
    path: PRIVATE_ROUTES.EMPLOYEES.path,
    icon: UserCogIcon
  },
  {
    id: 5,
    title: "Servicios",
    path: PRIVATE_ROUTES.SERVICES.path,
    icon: BubblesIcon
  }
];
export const SERVICES_CATEGORY = [
  { id: 1, label: "Básico", value: "BASIC" },
  { id: 2, label: "Completo", value: "COMPLETE" },
  { id: 3, label: "Premium", value: "PREMIUM" },
  { id: 4, label: "Otro", value: "OTHER" }
];

export const STATUS_OPTIONS = [
  { id: 1, label: "Activo", value: "ACTIVE" },
  { id: 2, label: "Inactivo", value: "INACTIVE" }
];

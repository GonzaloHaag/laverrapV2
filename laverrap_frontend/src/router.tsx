import { createBrowserRouter, Navigate } from "react-router";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/utils/routes";
import { DashboardPage, LoginPage, ServicesPage } from "@/pages";
import { ProtectedLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: PUBLIC_ROUTES.LOGIN.path,
    Component: LoginPage
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Navigate to={PRIVATE_ROUTES.DASHBOARD.path} replace /> },
      { path: PRIVATE_ROUTES.DASHBOARD.name, Component: DashboardPage },
      { path: PRIVATE_ROUTES.SERVICES.name, Component: ServicesPage }
    ]
  },
  {
    path: "*",
    Component: () => <div>404 Not Found</div>
  }
]);
import { createBrowserRouter } from "react-router";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/utils/routes";
import { DashboardPage, LoginPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      { path: PUBLIC_ROUTES.LOGIN, Component: LoginPage }
    ],
  },
  {
    path: "/",
    children: [
      { path: PRIVATE_ROUTES.DASHBOARD, Component: DashboardPage }
    ]
  },
  {
    path: "*",
    Component: () => <div>404 Not Found</div>
  }
]);
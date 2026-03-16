import { PRIVATE_ROUTES } from "@/utils/routes";
import { Link } from "react-router";
import { BubblesIcon } from "lucide-react";
import { Navbar } from "./Navbar";
import { ButtonLogout } from "./ButtonLogout";

export const Header = () => {
  return (
    <header className="w-full flex items-center min-h-20 bg-muted">
      <div className="container max-w-7xl w-full mx-auto flex items-center justify-between p-4">
        <Link to={PRIVATE_ROUTES.DASHBOARD.path} title="Laverrap" className="flex items-center gap-x-2 grow basis-0">
          <BubblesIcon size={40} className="text-blue-500" />
          <div className="flex flex-col gap-y-0">
            <span className="font-bold text-lg">Laverrap</span>
            <span className="text-sm">Sistema de gestión</span>
          </div>
        </Link>
        <Navbar />
        <div className="flex grow basis-0 justify-end">
          <ButtonLogout />
        </div>
      </div>
    </header>
  );
};
import { PRIVATE_ROUTES } from "@/utils/routes";
import { BubblesIcon, MenuIcon } from "lucide-react";
import { Link } from "react-router";

export const HeaderMobile = () => {
  return (
    <header className="w-full items-center min-h-20 bg-muted flex lg:hidden">
      <div className="container max-w-7xl w-full mx-auto flex items-center justify-between p-4">
        <Link to={PRIVATE_ROUTES.DASHBOARD.path} title="Laverrap" className="flex items-center gap-x-2 grow basis-0">
          <BubblesIcon size={40} className="text-blue-500" />
          <div className="flex flex-col gap-y-0">
            <span className="font-bold text-lg">Laverrap</span>
            <span className="text-sm">Sistema de gestión</span>
          </div>
        </Link>
        <MenuIcon size={24} className="text-gray-500" />
      </div>
    </header>
  );
};
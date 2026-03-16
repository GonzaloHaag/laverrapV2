import { LogOutIcon } from "lucide-react";
import { Button } from "../ui";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services";
import { useNavigate } from "react-router";
import { PUBLIC_ROUTES } from "@/utils/routes";


export const ButtonLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onClickLogout = () => {
    authService.logout();
    queryClient.clear();
    navigate(PUBLIC_ROUTES.LOGIN.path,{ replace: true });
  };
  return (
    <Button type="button" variant={"outline"} title="Cerrar sesión" size={"lg"} onClick={onClickLogout}>
      <LogOutIcon size={20} />
        Cerrar sesión
    </Button>
  );
};
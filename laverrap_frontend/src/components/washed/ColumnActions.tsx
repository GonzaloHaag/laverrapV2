import type { Washing } from "@/types";
import { AlertDialogConfirm } from "../shared";
import { useWashingMutations } from "@/hooks";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../ui";
import { BanIcon, CheckCircleIcon, PlayIcon } from "lucide-react";
import { toast } from "sonner";

interface Props {
    washing: Washing;
}
export const ColumnActions = ({ washing } : Props ) => {
  const { mutationDelete, mutationUpdateStatus } = useWashingMutations();
  const handleAction = async (status: Washing["status"]) => {
    if(washing.status === "COMPLETED") {
      toast.error("No se puede actualizar el estado de un lavado completado.");
      return;
    }
    if(washing.status === status) {
      toast.error("El lavado ya se encuentra en el estado seleccionado.");
      return;
    }
    await mutationUpdateStatus.mutateAsync({ id: washing.id, status });
    toast.success("Estado del lavado actualizado exitosamente.");
  };
  return (
    <div>
      <AlertDialogConfirm id={washing.id} mutationDelete={mutationDelete} />
      <Tooltip>
        <TooltipTrigger render={
          <Button variant="outline" size={"icon"} onClick={() => handleAction("CANCELED")} disabled={mutationUpdateStatus.isPending}><BanIcon className="text-red-500" /></Button>
        }>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cancelar lavado</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={
          <Button variant="outline" className="ml-2" size={"icon"} onClick={() => handleAction("IN_PROGRESS")} disabled={mutationUpdateStatus.isPending}><PlayIcon /></Button>
        }>
        </TooltipTrigger>
        <TooltipContent>
          <p>Comenzar lavado</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={
          <Button variant="outline" className="ml-2"  size={"icon"} onClick={() => handleAction("COMPLETED")} disabled={mutationUpdateStatus.isPending}><CheckCircleIcon className="text-green-500" /></Button>
        }>
        </TooltipTrigger>
        <TooltipContent>
          <p>Finalizar lavado</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
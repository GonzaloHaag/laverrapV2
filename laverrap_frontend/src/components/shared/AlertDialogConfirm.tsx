import { Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "../ui";
import { useState } from "react";
import { toast } from "sonner";
import type { UseMutationResult } from "@tanstack/react-query";
interface Props {
    id: number; /** Id del recurso a borrar */
    mutationDelete: UseMutationResult<null, Error, {
    id: number;
}, unknown>
}
export const AlertDialogConfirm = ({ id, mutationDelete }: Props) => {
  const [open, setOpen] = useState(false);
  const onClickConfirmDelete = async () => {
    await mutationDelete.mutateAsync({ id: id });
    setOpen(false);
    toast.success("Recurso eliminado correctamente.");
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={
        <Button variant="destructive" size={"icon"} title="Borrar" className="mr-2">
          <Trash2Icon />
        </Button>
      }>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
           Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"} onClick={onClickConfirmDelete} disabled={mutationDelete.isPending}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
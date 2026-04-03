import { useState } from "react";
import { PencilIcon, PlusCircleIcon } from "lucide-react";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui";
import type { Employee } from "@/types";
import { FormEmployee } from "./FormEmployee";

interface Props {
  employee: Employee | null
}
export const DialogEmployee = ({ employee }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button type="button" variant={employee ? "outline" : "default"} title="Agregar empleado" size={employee ? "icon" : "lg"}>
          {
            employee ? 
              <PencilIcon className="text-green-500" /> 
              : (
                <>
                  <PlusCircleIcon />
                  Agregar empleado 
                </>
              )
          }
        </Button>
      }>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Agregar empleado</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo empleado a tu sistema.
          </DialogDescription>
        </DialogHeader>
        <FormEmployee employee={employee} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
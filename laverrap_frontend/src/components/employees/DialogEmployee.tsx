import { PencilIcon, PlusCircleIcon } from "lucide-react";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui";
import type { Employee } from "@/types";

interface Props {
  employee: Employee | null
}
export const DialogEmployee = ({ employee }: Props) => {
  return (
    <Dialog>
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
        {/* <FormService service={service} /> */}
      </DialogContent>
    </Dialog>
  );
};
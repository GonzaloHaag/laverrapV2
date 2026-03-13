import { PencilIcon, PlusCircleIcon } from "lucide-react";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui";
import { FormService } from "./FormService";
import type { Service } from "@/types";
interface Props {
  service: Service | null;
}
export const DialogService = ({ service }: Props) => {
  return (
    <Dialog>
      <DialogTrigger render={
        <Button type="button" variant={service ? "outline" : "default"} title="Agregar servicio" size={service ? "icon" : "lg"}>
          {
            service ? 
              <PencilIcon className="text-green-500" /> 
              : (
                <>
                  <PlusCircleIcon />
                  Agregar servicio 
                </>
              )
          }
        </Button>
      }>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Agregar servicio</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo servicio a tu sistema de lavado de autos.
          </DialogDescription>
        </DialogHeader>
        <FormService service={service} />
      </DialogContent>
    </Dialog>
  );
};
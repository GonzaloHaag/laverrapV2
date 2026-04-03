import { useState } from "react";
import { PencilIcon, PlusCircleIcon } from "lucide-react";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui";
import type { Washing } from "@/types";
import { FormWashing } from "./FormWashing";

interface Props {
  washing: Washing | null;
}
export const DialogWashing = ({ washing }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button type="button" variant={washing ? "outline" : "default"} title="Agregar lavado" size={washing ? "icon" : "lg"}>
          {
            washing ? 
              <PencilIcon className="text-green-500" /> 
              : (
                <>
                  <PlusCircleIcon />
                  Agregar lavado 
                </>
              )
          }
        </Button>
      }>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Agregar lavado</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo lavado a tu sistema de lavado de autos.
          </DialogDescription>
        </DialogHeader>
        <FormWashing washing={washing} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
import { PencilIcon, PlusCircleIcon } from "lucide-react";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui";
import type { Client } from "@/types";
import { useState } from "react";

interface Props {
  client: Client | null;
}
export const DialogClient = ({ client }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button type="button" variant={client ? "outline" : "default"} title="Agregar cliente" size={client ? "icon" : "lg"}>
          {
            client ? 
              <PencilIcon className="text-green-500" /> 
              : (
                <>
                  <PlusCircleIcon />
                  Agregar cliente
                </>
              )
          }
        </Button>
      }>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Agregar cliente</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo cliente a tu sistema.
          </DialogDescription>
        </DialogHeader>
        {/* <FormEmployee employee={employee} closeDialog={closeDialog} /> */}
      </DialogContent>
    </Dialog>
  );
};
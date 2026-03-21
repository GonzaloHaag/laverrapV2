import type { Client } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "../ui";
import { ColumnActions } from "./ColumnActions";

export const Columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    id:"contact",
    header: "Contacto",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div>
          <Link to={`mailto:${client.email}`} target="_blank" rel="noopener noreferrer" title="Enviar correo" className="text-blue-500 hover:underline">{client.email}</Link>
          <Link to={`tel:${client.phone}`} title="Llamar" className="text-blue-500 hover:underline">{client.phone}</Link>
        </div>
      );
    }
  },
  {
    id: "vehicle",
    header: "Vehículo",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex flex-col gap-y-1">
          {client.car_model}
          <Badge variant={"outline"} className="font-bold">
            {client.car_plate}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status === "ACTIVE" ? "default" : "destructive"}>
          {status === "ACTIVE" ? "Activo" : "Inactivo"}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions client={row.original} />
  }

];
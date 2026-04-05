

import type { Employee } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui";
import { ColumnActions } from "./ColumnActions";
import { formatTime } from "@/utils/formatters";
import type { UseMutationResult } from "@tanstack/react-query";
interface Props {
   mutationDeactivate: UseMutationResult<null, Error, {
    id: Employee["id"];
}, unknown>
}

export const createColumns = ({ mutationDeactivate } : Props): ColumnDef<Employee>[] => [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Contacto",
  },
  {
    accessorKey: "entry_time",
    header: "Hora de entrada",
    cell: ({ row }) => formatTime(row.getValue("entry_time"))
  },
  {
    accessorKey: "departure_time",
    header: "Hora de salida",
    cell: ({ row }) => formatTime(row.getValue("departure_time"))
  },
  {
    accessorKey: "_count.washed",
    header: "Lavados completados",
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
    cell: ({ row }) => <ColumnActions employee={row.original} mutationDeactivate={mutationDeactivate} />
  },
];
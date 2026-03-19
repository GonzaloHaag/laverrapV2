

import type { Employee } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui";
import { ColumnActions } from "./ColumnActions";
const formatTime = (isoString: string) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(date);
};
export const Columns: ColumnDef<Employee>[] = [
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
    cell: ({ row }) => formatTime(row.original.entry_time)
  },
  {
    accessorKey: "departure_time",
    header: "Hora de salida",
    cell: ({ row }) => formatTime(row.original.departure_time)
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "ACTIVE" ? "default" : "destructive"}>
          {status === "ACTIVE" ? "Activo" : "Inactivo"}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions employee={row.original} />
  },
];
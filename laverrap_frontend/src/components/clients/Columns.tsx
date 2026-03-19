import type { Client } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
];
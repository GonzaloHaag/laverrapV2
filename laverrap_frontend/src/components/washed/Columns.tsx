import type { Washing } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const Columns:ColumnDef<Washing>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "client_name",
    header: "Cliente",
  },
];
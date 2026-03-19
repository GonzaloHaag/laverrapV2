import type { Service, ServiceCategory } from "@/types";
import { formatCurrency } from "@/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { ColumnActions } from "./ColumnActions";
import { Badge } from "../ui";


const formatCategory: Record<ServiceCategory, "Básico" | "Completo" | "Premium" | "Otra"> = {
  BASIC: "Básico",
  COMPLETE: "Completo",
  PREMIUM: "Premium",
  OTHER: "Otra"
};

export const Columns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "duration",
    header: "Duración (min)",
    cell: ({ row }) => {
      const duration = row.getValue("duration");
      return duration ? `${duration} min` : "0 min";
    }
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return formatCurrency(price);
    }
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const category: ServiceCategory = row.getValue("category");
      return (
        <Badge variant={"outline"} title={formatCategory[category]}>
          {formatCategory[category]}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions service={row.original} />
  }
];
import type { Service, ServiceCategory } from "@/types";
import { formatCurrency, formatServiceCategory } from "@/utils/formatters";
import { ColumnActions } from "./ColumnActions";
import { Badge } from "../ui";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
interface Props {
    mutationDelete: UseMutationResult<null, Error, {
    id: Service["id"];
}, unknown>
}

export const createColumns = ({ mutationDelete } : Props): ColumnDef<Service>[] => [
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
        <Badge variant={category === "COMPLETE" ? "default" : "outline"} title={formatServiceCategory[category]}>
          {formatServiceCategory[category]}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions service={row.original} mutationDelete={mutationDelete} />
  }
];
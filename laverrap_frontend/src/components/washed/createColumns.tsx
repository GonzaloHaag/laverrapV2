import type { Washing } from "@/types";
import { formatCurrency, formatDate, formatWashingStatus } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckIcon } from "lucide-react";
import { Badge } from "../ui";
import { ColumnActions } from "./ColumnActions";
import type { UseMutationResult } from "@tanstack/react-query";
interface Props {
    mutationDelete: UseMutationResult<null, Error, {
    id: Washing["id"];
}, unknown>;
    mutationUpdateStatus: UseMutationResult<Washing, Error, {
    id: Washing["id"];
    status: Washing["status"];
}, unknown>;
}
export const createColumns = ({ mutationDelete, mutationUpdateStatus } : Props ):ColumnDef<Washing>[] => [
  {
    accessorKey: "id",
    header: "ID", 
  },
  {
    id: "client_name",
    accessorKey: "client.name",
    header: "Cliente",
    filterFn: "includesString"
  },
  {
    id: "vehicle",
    header: "Vehículo",
    cell: ({ row }) => {
      const carModel = row.original.client.car_model;
      const carPlate = row.original.client.car_plate;
      return `${carModel} - ${carPlate}`;
    }
  },
  {
    accessorKey: "employee.name",
    header: "Empleado",
  },
  {
    accessorKey: "service.price",
    header: "Precio",
    cell: ({ row }) => {
      const price = row.original.service.price;
      return formatCurrency(price);
    }
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string;
      return formatDate(createdAt);
    }
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status === "COMPLETED" ? "success" : "outline"} title={formatWashingStatus[status as Washing["status"]]}>
          {formatWashingStatus[status as Washing["status"]]}
        </Badge>
      );
    }
  },
  {
    accessorKey: "should_notify",
    header: "Notificar",
    cell: ({ row }) => {
      const shouldNotify = row.getValue("should_notify");
      return (
        <>
          { shouldNotify ? <CheckIcon className="text-green-600" size={20} /> : "No" }
        </>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions washing={row.original} mutationDelete={mutationDelete} mutationUpdateStatus={mutationUpdateStatus} />
  }
];
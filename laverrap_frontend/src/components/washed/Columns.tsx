import type { Washing } from "@/types";
import { formatCurrency } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckIcon } from "lucide-react";
import { Badge } from "../ui";
import { ColumnActions } from "./ColumnActions";
const formatStatus: Record<Washing["status"], string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En Progreso",
  COMPLETED: "Completado",
  CANCELED: "Cancelado"
};
export const Columns:ColumnDef<Washing>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "client.name",
    header: "Cliente",
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
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleString();
    }
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={"outline"} title={formatStatus[status as Washing["status"]]}>
          {formatStatus[status as Washing["status"]]}
        </Badge>
      );
    }
  },
  {
    accessorKey: "should_notify",
    header: "Notificar",
    cell: ({ row }) => {
      const shouldNotifify = row.getValue("should_notify");
      return (
        <>
          { shouldNotifify ? <CheckIcon className="text-green-600" size={20} /> : "No" }
        </>
      );
    }
  },
  {
    accessorKey: "notified_at",
    header: "Email enviado",
    cell: ({ row }) => {
      const notifiedAt = row.getValue("notified_at");
      return notifiedAt ? notifiedAt.toLocaleString() : "No enviado";
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions washing={row.original} />
  }
];
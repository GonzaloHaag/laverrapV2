import type { Service } from "@/types";
import { formatCurrency } from "@/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { DialogService } from "./DialogService";

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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;
      return (
        <div>
          <DialogService service={service} />
          {/* <AlertDialogConfirm
        onClickConfirm={onClickConfirmDeleteService}
        isRestore={false}
      /> */}
        </div>
      );
    }
  }
];
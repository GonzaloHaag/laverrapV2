

import type { Employee } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { DialogEmployee } from "./DialogEmployee";

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
    accessorKey: "entryTime",
    header: "Hora de entrada",
  },
  {
    accessorKey: "departureTime",
    header: "Hora de salida",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div>
          <DialogEmployee employee={employee} />
          {/* <AlertDialogConfirm
        onClickConfirm={onClickConfirmDeleteService}
        isRestore={false}
      /> */}
        </div>
      );
    }
  }
];

import type { Employee } from "@/types";
import { AlertDialogConfirm } from "../shared";
import { DialogEmployee } from "./DialogEmployee";
import type { UseMutationResult } from "@tanstack/react-query";

interface Props {
    employee: Employee;
    mutationDeactivate: UseMutationResult<null, Error, {
    id: Employee["id"];
}, unknown>
}
export const ColumnActions = ({ employee, mutationDeactivate }: Props) => {
  return (
    <div>
      <AlertDialogConfirm id={employee.id} mutationDelete={mutationDeactivate} />
      <DialogEmployee employee={employee} />
    </div>
  );
};
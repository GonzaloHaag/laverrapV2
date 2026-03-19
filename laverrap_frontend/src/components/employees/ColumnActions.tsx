
import type { Employee } from "@/types";
import { AlertDialogConfirm } from "../shared";
import { useEmployeeMutations } from "@/hooks";
import { DialogEmployee } from "./DialogEmployee";

interface Props {
    employee: Employee;
}
export const ColumnActions = ({ employee }: Props) => {
  const { mutationDeactivate } = useEmployeeMutations();
  return (
    <div>
      <AlertDialogConfirm id={employee.id} mutationDelete={mutationDeactivate} />
      <DialogEmployee employee={employee} />
    </div>
  );
};
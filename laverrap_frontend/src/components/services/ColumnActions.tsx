import type { Service } from "@/types";
import { AlertDialogConfirm } from "../shared";
import { DialogService } from "./DialogService";
import type { UseMutationResult } from "@tanstack/react-query";
interface Props {
    service: Service;
    mutationDelete: UseMutationResult<null, Error, {
    id: Service["id"];
}, unknown>
}
export const ColumnActions = ({ service, mutationDelete }: Props) => {
  return (
    <div>
      <AlertDialogConfirm id={service.id} mutationDelete={mutationDelete} />
      <DialogService service={service} />
    </div>
  );
};
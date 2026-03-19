import type { Service } from "@/types";
import { AlertDialogConfirm } from "../shared";
import { DialogService } from "./DialogService";
import { useServiceMutations } from "@/hooks";
interface Props {
    service: Service;
}
export const ColumnActions = ({ service }: Props) => {
  const { mutationDelete } = useServiceMutations();
  return (
    <div>
      <AlertDialogConfirm id={service.id} mutationDelete={mutationDelete} />
      <DialogService service={service} />
    </div>
  );
};
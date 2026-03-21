
import type { Client } from "@/types";
import { AlertDialogConfirm } from "../shared";
import { useClientMutations } from "@/hooks";
import { DialogClient } from "./DialogClient";
interface Props {
    client: Client;
}
export const ColumnActions = ({ client }: Props) => {
  const { mutationDeactivate } = useClientMutations();
  return (
    <div>
      <AlertDialogConfirm id={client.id} mutationDelete={mutationDeactivate} />
      <DialogClient client={client} />
    </div>
  );
};
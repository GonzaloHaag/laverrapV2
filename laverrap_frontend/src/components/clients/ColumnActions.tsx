
import type { Client } from "@/types";
import { AlertDialogConfirm } from "../shared";
import { DialogClient } from "./DialogClient";
import type { UseMutationResult } from "@tanstack/react-query";
interface Props {
    client: Client;
    mutationDeactivate: UseMutationResult<null, Error, {
    id: Client["id"];
}, unknown>
}
export const ColumnActions = ({ client, mutationDeactivate }: Props) => {
  return (
    <div>
      <AlertDialogConfirm id={client.id} mutationDelete={mutationDeactivate} />
      <DialogClient client={client} />
    </div>
  );
};
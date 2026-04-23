import { useMemo } from "react";
import { createColumns, DialogClient } from "@/components/clients";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { useClientMutations, useClients } from "@/hooks";
import { ButtonDownloadPDF } from "@/components/shared";

export const ClientsPage = () => {
  const { isLoading, data, isError } = useClients();
  const { mutationDeactivate } = useClientMutations();
  const columns = useMemo(() => createColumns({ mutationDeactivate }), [mutationDeactivate]);
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
          <CardDescription>
            Administra los clientes de tu lavadero
          </CardDescription>
          <CardAction>
            <ButtonDownloadPDF className="mr-4" />
            <DialogClient client={null} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={data ?? []}
            searchPlaceholder="Buscar por nombre..."
            searchFilter="name"
            isError={isError}
          />
        </CardContent>
      </Card>
    </section>
  );
};
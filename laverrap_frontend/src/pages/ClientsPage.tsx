import { Columns, DialogClient } from "@/components/clients";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { useClients } from "@/hooks";

export const ClientsPage = () => {
  const { isFetching, data, isError } = useClients();
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>
            Administra los clientes de tu lavadero
          </CardDescription>
          <CardAction>
            <DialogClient client={null} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataTable
            isLoading={isFetching}
            columns={Columns}
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
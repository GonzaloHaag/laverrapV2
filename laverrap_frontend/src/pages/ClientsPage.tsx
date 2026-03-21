import { Columns, DialogClient } from "@/components/clients";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { clientService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const ClientsPage = () => {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: clientService.getAll,
    retry: false,
  });
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
            isLoading={query.isLoading}
            columns={Columns}
            data={query.data ?? []}
            searchPlaceholder="Buscar por nombre..."
            searchFilter="name"
          />
        </CardContent>
      </Card>
    </section>
  );
};
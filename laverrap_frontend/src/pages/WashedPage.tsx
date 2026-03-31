import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { Columns } from "@/components/washed";
import { washingService } from "@/services/washing-service";
import { useQuery } from "@tanstack/react-query";

export const WashedPage = () => {
  const query = useQuery({
    queryKey: ["services"],
    queryFn: washingService.getAll,
    retry: false,
  });
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Empleados</CardTitle>
          <CardDescription>
            Administra los empleados de tu lavadero
          </CardDescription>
          <CardAction>
            {/* <DialogEmployee employee={null} /> */}
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

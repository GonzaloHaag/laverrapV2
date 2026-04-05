import { useMemo } from "react";
import { createColumns, DialogService } from "@/components/services";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
} from "@/components/ui";
import { useServiceMutations, useServices } from "@/hooks";

export const ServicesPage = () => {
  const { isLoading, isError, data } = useServices();
  const { mutationDelete } = useServiceMutations();
  const columns = useMemo(() => createColumns({ mutationDelete }), [mutationDelete]);
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Servicios</CardTitle>
          <CardDescription>
            Administra los servicios de tu lavadero
          </CardDescription>
          <CardAction>
            <DialogService service={null} />
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

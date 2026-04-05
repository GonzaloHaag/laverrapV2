import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { createColumns, DialogWashing } from "@/components/washed";
import { useWashed, useWashingMutations } from "@/hooks";
import { useMemo } from "react";

export const WashedPage = () => {
  const { isLoading, isError, data } = useWashed();
  const { mutationDelete, mutationUpdateStatus } = useWashingMutations();
  const columns = useMemo(() => createColumns({ mutationDelete, mutationUpdateStatus }), [ mutationDelete, mutationUpdateStatus ]);
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Empleados</CardTitle>
          <CardDescription>
            Administra los empleados de tu lavadero
          </CardDescription>
          <CardAction>
            <DialogWashing washing={null} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={data ?? []}
            searchPlaceholder="Buscar por cliente..."
            searchFilter="client_name"
            isError={isError}
            filterByStatus={true}
          />
        </CardContent>
      </Card>
    </section>
  );
};

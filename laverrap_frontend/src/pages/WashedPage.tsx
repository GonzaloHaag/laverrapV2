import { useMemo } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { createColumns, DialogWashing } from "@/components/washed";
import { useWashed, useWashingMutations } from "@/hooks";
import { WASHING_STATUS_OPTIONS } from "@/utils/consts";

export const WashedPage = () => {
  const { isLoading, isError, data } = useWashed();
  const { mutationDelete, mutationUpdateStatus } = useWashingMutations();
  const columns = useMemo(() => createColumns({ mutationDelete, mutationUpdateStatus }), [ mutationDelete, mutationUpdateStatus ]);
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lavados</CardTitle>
          <CardDescription>
            Administra los lavados de tu lavadero
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
            isError={isError}
            searchPlaceholder="Buscar por cliente..."
            searchFilter="client_name"
            filterByStatus
            options={WASHING_STATUS_OPTIONS}
          />
        </CardContent>
      </Card>
    </section>
  );
};

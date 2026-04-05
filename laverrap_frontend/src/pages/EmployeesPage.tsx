import { createColumns, DialogEmployee } from "@/components/employees";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { useEmployeeMutations, useEmployees } from "@/hooks";
import { useMemo } from "react";

export const EmployeesPage = () => {
  const { isLoading, isError, data } = useEmployees();
  const { mutationDeactivate } = useEmployeeMutations();
  const columns = useMemo(() => createColumns({ mutationDeactivate }), [mutationDeactivate]);
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Empleados</CardTitle>
          <CardDescription>
            Administra los empleados de tu lavadero
          </CardDescription>
          <CardAction>
            <DialogEmployee employee={null} />
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
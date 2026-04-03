import { Columns, DialogEmployee } from "@/components/employees";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { useEmployees } from "@/hooks";

export const EmployeesPage = () => {
  const { isFetching, isError, data } = useEmployees();
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
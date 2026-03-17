import { Columns, DialogEmployee } from "@/components/employees";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { employeeService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const EmployeesPage = () => {
  const query = useQuery({
    queryKey: ["employees"],
    queryFn: employeeService.getAll,
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
            <DialogEmployee employee={null} />
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* <DataTable
            isLoading={query.isLoading}
            columns={Columns}
            data={query.data ?? []}
            searchPlaceholder="Buscar por nombre..."
            searchFilter="name"
          /> */}
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
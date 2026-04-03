import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/components/ui";
import { Columns, DialogWashing } from "@/components/washed";
import { useWashed } from "@/hooks";

export const WashedPage = () => {
  const { isFetching, isError, data } = useWashed();
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
            isLoading={isFetching}
            columns={Columns}
            data={data ?? []}
            searchPlaceholder="Buscar por nombre..."
            searchFilter="id"
            isError={isError}
          />
        </CardContent>
      </Card>
    </section>
  );
};

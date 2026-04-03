import { Columns, DialogService } from "@/components/services";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
} from "@/components/ui";
import { useServices } from "@/hooks";

export const ServicesPage = () => {
  const { isFetching, isError, data } = useServices();
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

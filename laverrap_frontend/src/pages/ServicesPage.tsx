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
import { serviceService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const ServicesPage = () => {
  const query = useQuery({
    queryKey: ["services"],
    queryFn: serviceService.getAll,
    retry: false,
  });
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

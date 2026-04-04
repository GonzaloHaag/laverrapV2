import { washingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { FormDialogFooter, SelectForm } from "../shared";
import { useClients, useEmployees, useServices, useWashingMutations } from "@/hooks";
import type { Washing } from "@/types";
import { WASHING_STATUS_OPTIONS, YES_NO_OPTIONS } from "@/utils/consts";
import { Separator } from "../ui";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "sonner";
interface Props {
  washing: Washing | null;
  closeDialog: () => void;
}
export const FormWashing = ({ washing, closeDialog }: Props) => {
  const { isFetching: isFetchingEmployees, data: employeesData } = useEmployees();
  const { isFetching: isFetchingClients, data: clientsData } = useClients();
  const { isFetching: isFetchingServices, data: servicesData } = useServices();
  const { mutationCreate } = useWashingMutations();
  const { register, handleSubmit, formState:{ errors, isSubmitting }, control } = useForm({
    resolver: zodResolver(washingSchema),
    defaultValues: {
      employee_id: washing?.employee.id ?? undefined,
      client_id: washing?.client.id ?? undefined,
      service_id: washing?.service.id ?? undefined,
      status: washing?.status ?? "PENDING",
      should_notify: washing?.should_notify ?? false,
    },
    mode: "onSubmit"
  });

  const employeesOptions = employeesData && employeesData.length > 0 ? employeesData.map((employee) => ({
    id: employee.id,
    label: employee.name,
    value: employee.id
  })) : [];

  const clientsOptions = clientsData && clientsData.length > 0 ? clientsData.map((client) => ({
    id: client.id,
    label: client.name,
    value: client.id
  })) : [];
  
  const servicesOptions = servicesData && servicesData.length > 0 ? servicesData.map((service) => ({
    id: service.id,
    label: service.name,
    value: service.id
  })) : [];

  const serviceSelected = useWatch({
    name: "service_id",
    control
  });

  const clientSelected = useWatch({
    name: "client_id",
    control
  });

  const servicePrice = servicesData?.find((service) => service.id === serviceSelected)?.price ?? 0;
  const client = clientsData?.find((client) => client.id === clientSelected);
  const onSubmit = handleSubmit((data) => {
    mutationCreate.mutate({ payload: data });
    toast.success("Lavado creado exitosamente");
    closeDialog();
  });
  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
      <SelectForm label="Cliente *" 
        placeholder={isFetchingClients ? "Cargando clientes..." : "Seleccione cliente"}
        options={clientsOptions} 
        {...register("client_id", { valueAsNumber: true })} 
        error={errors.client_id?.message}
      />
      <SelectForm label="Servicio *" 
        placeholder={isFetchingServices ? "Cargando servicios..." : "Seleccione servicio"} 
        options={servicesOptions} 
        {...register("service_id", { valueAsNumber: true })} 
        error={errors.service_id?.message}
      />
      <SelectForm label="Estado *"
        options={WASHING_STATUS_OPTIONS}
        {...register("status")} 
      />
      <SelectForm label="Notificar al finalizar"
        options={YES_NO_OPTIONS}
        {...register("should_notify", { setValueAs: (value) => value === "true" })}
      />
      <SelectForm label="Empleado *" 
        placeholder={isFetchingEmployees ? "Cargando empleados..." : "Seleccione empleado"}
        options={employeesOptions} 
        {...register("employee_id", { valueAsNumber: true })} 
        error={errors.employee_id?.message}
        className="col-span-2 w-full"
      />
      <Separator className="col-span-2 w-full" />
      <div className="col-span-2 w-full flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Precio total del lavado: {formatCurrency(servicePrice)}</span>
        <span className="text-sm text-muted-foreground">Vehículo: { client ? `${client.car_model} - ${client.car_plate}` : "Cliente no seleccionado" }</span>
        <span className="text-sm text-muted-foreground">Email cliente: { client ? client.email : "Cliente no seleccionado" }</span>
      </div>
      <FormDialogFooter isSubmitting={isSubmitting} />
    </form>
  );
};
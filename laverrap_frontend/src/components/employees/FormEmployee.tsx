import { employeeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormDialogFooter, InputForm, SelectForm } from "../shared";
import { STATUS_OPTIONS } from "@/utils/consts";
import type { Employee } from "@/types";
import { useEmployeeMutations } from "@/hooks";
import { toast } from "sonner";
interface Props {
    employee: Employee | null;
    closeDialog: () => void;
}

const isoToTimeString = (iso?: string | null) => {
  if (!iso) return "";
  const date = new Date(iso);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};


export const FormEmployee = ({ employee, closeDialog }: Props) => {
  const { mutationCreate, mutationUpdate } = useEmployeeMutations();
  const { register, handleSubmit, formState:{ errors, isSubmitting }} = useForm({
    resolver: zodResolver(employeeSchema),
    mode: "onSubmit",
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      status: employee?.status || "ACTIVE",
      entry_time: isoToTimeString(employee?.entry_time),
      departure_time: isoToTimeString(employee?.departure_time),
    }
  });
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const onSubmit = handleSubmit(async(data) => {
    const payload = {
      ...data,
      entry_time: new Date(`${today}T${data.entry_time}`).toISOString(),
      departure_time: new Date(`${today}T${data.departure_time}`).toISOString(),
    };
    if(employee) {
      await mutationUpdate.mutateAsync({ id: employee.id, payload: payload });
    } else {
      await mutationCreate.mutateAsync({ payload: payload });
    }
    toast.success(`Empleado ${employee ? "actualizado" : "creado"} exitosamente`);
    closeDialog();
  });
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-full">
      <InputForm
        label="Nombre *"
        placeholder="Ingrese nombre del empleado"
        {...register("name")}
        type="text"
        htmlFor="name" 
        error={errors.name?.message}
      />
      <InputForm
        label="Email *"
        placeholder="Ingrese el correo del empleado"
        {...register("email")}
        type="email"
        htmlFor="email"
        error={errors.email?.message}
      />
      <InputForm 
        label="Teléfono"
        placeholder="Télefono"
        {...register("phone")}
        type="tel"
        htmlFor="phone"
        error={errors.phone?.message}
      />
      <SelectForm
        label="Estado *"
        options={STATUS_OPTIONS}
        {...register("status")}
        error={errors.status?.message}
      />
      <InputForm
        label="Hora de entrada"
        placeholder="Hora de entrada"
        {...register("entry_time")}
        type="time"
        htmlFor="entryTime"
        error={errors.entry_time?.message}
      />
      <InputForm
        label="Hora de salida"
        placeholder="Hora de salida"
        {...register("departure_time")}
        type="time"
        htmlFor="departureTime"
        error={errors.departure_time?.message}
      />
      <FormDialogFooter isSubmitting={isSubmitting} />
    </form>
  );
};
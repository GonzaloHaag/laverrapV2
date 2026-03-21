import { clientSchema } from "@/schemas";
import type { Client } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormDialogFooter, InputForm, SelectForm } from "../shared";
import { TYPES_OF_VEHICLES } from "@/utils/consts";
import { useClientMutations } from "@/hooks";
import { toast } from "sonner";
interface Props {
    client: Client | null;
    closeDialog: () => void;
}
export const FormClient = ({ closeDialog, client }: Props) => {
  const { mutationCreate, mutationUpdate } = useClientMutations();
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name ?? "",
      email: client?.email ?? "",
      phone: client?.phone ?? "",
      car_type: client?.car_type ?? "CAR",
      car_model: client?.car_model ?? "",
      car_plate: client?.car_plate ?? "",
      status: client?.status ?? "ACTIVE"
    },
    mode: "onSubmit"
  });

  const onSubmit = handleSubmit(async(data) => {
    console.log(data);
    if(client) {
      await mutationUpdate.mutateAsync({ id: client.id, payload: data });
    } else {
      await mutationCreate.mutateAsync({ payload: data });
    }
    closeDialog();
    toast.success(`Cliente ${client ? "actualizado" : "creado"} exitosamente`);
  });
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
      <InputForm label="Nombre *" {...register("name")} htmlFor="name" error={errors.name?.message} type="text" placeholder="Nombre" />
      <InputForm label="Correo electrónico *" {...register("email")} htmlFor="email" error={errors.email?.message} type="email" placeholder="example@test.com" />
      <InputForm label="Teléfono" {...register("phone")} htmlFor="phone" error={errors.phone?.message} type="tel" placeholder="Número de teléfono" />
      <SelectForm label="Tipo de vehículo" options={TYPES_OF_VEHICLES} {...register("car_type")} error={errors.car_type?.message} />
      <InputForm label="Modelo del vehículo *" {...register("car_model")} htmlFor="car_model" error={errors.car_model?.message} type="text" placeholder="Ej: Toyota 2020" />
      <InputForm label="Placa del vehículo *" {...register("car_plate")} htmlFor="car_plate" error={errors.car_plate?.message} type="text" placeholder="Ej: MLKS 3020" />
      <FormDialogFooter isSubmitting={mutationCreate.isPending || mutationUpdate.isPending} />
    </form>
  );
};
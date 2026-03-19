import { useForm } from "react-hook-form";
import { FormDialogFooter, InputForm, SelectForm } from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/schemas";
import { SERVICES_CATEGORY } from "@/utils/consts";
import { Field, FieldLabel, Textarea } from "../ui";
import type { Service } from "@/types";
import { useServiceMutations } from "@/hooks";
import { toast } from "sonner";
interface Props {
  service: Service | null;
  closeDialog: () => void;
}
export const FormService = ({ service, closeDialog }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(serviceSchema),
    mode: "onSubmit",
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      category: service?.category || "BASIC",
      duration: service?.duration || 0,
    }
  });
  const { mutationCreate, mutationUpdate } = useServiceMutations();

  const onSubmit = handleSubmit(async (data) => {
    if(service) {
      await mutationUpdate.mutateAsync({ id: service.id, payload: data });
    } else {
      await mutationCreate.mutateAsync({ payload: data });
    }
    closeDialog();
    toast.success(`Servicio ${service ? "actualizado" : "creado"} exitosamente`);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4 w-full">
      <InputForm
        label="Nombre del servicio"
        htmlFor="name"
        placeholder="Ej: Lavado completo"
        type="text"
        {...register("name")}
        error={errors.name?.message}
      />
      <div className="grid grid-cols-2 gap-4 items-start">
        <InputForm
          label="Precio"
          htmlFor="price"
          placeholder="$0.00"
          type="number"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <SelectForm
          label="Categoría *"
          options={SERVICES_CATEGORY}
          error={errors.category?.message}
          {...register("category")}
        />
      </div>
      <InputForm
        label="Duración aprox. (minutos)"
        htmlFor="duration"
        placeholder="0"
        type="number"
        {...register("duration",{ valueAsNumber: true })}
        error={errors.duration?.message}
      />
      <Field className="flex flex-col gap-y-1">
        <FieldLabel htmlFor="description">Descripción</FieldLabel>
        <Textarea
          placeholder="Agrega una descripción del servicio"
          {...register("description")}
          rows={4}
        />
      </Field>
      <FormDialogFooter isSubmitting={mutationCreate.isPending || mutationUpdate.isPending} />
    </form>
  );
};
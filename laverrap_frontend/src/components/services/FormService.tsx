import { useForm } from "react-hook-form";
import { FormDialogFooter, InputForm, SelectForm } from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/schemas";
import { SERVICES_CATEGORY } from "@/utils/consts";
import { Field, FieldLabel, Textarea } from "../ui";
import type { Service } from "@/types";
interface Props {
  service: Service | null;
}
export const FormService = ({ service }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      category: service?.category || "BASIC"
    }
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
          placeholder="Ej: 25.00"
          type="number"
          {...register("price")}
          error={errors.price?.message}
        />
        <SelectForm
          label="Categoría *"
          options={SERVICES_CATEGORY}
          error={errors.category?.message}
          {...register("category")}
        />
      </div>
      <Field className="flex flex-col gap-y-1">
        <FieldLabel htmlFor="description">Descripción</FieldLabel>
        <Textarea
          placeholder="Agrega una descripción del servicio"
          {...register("description")}
          rows={4}
        />
      </Field>
      <FormDialogFooter isSubmitting={false} />
    </form>
  );
};
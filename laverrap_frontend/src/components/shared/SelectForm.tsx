
import { Field, FieldError, FieldLabel, NativeSelect, NativeSelectOption } from "../ui";
import { forwardRef, type SelectHTMLAttributes } from "react";


interface SelectFormProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  labelFor?: string;
  error?: string;
  placeholder?: string;
  options: { id: number; label: string; value: string | number }[];
}

export const SelectForm = forwardRef<HTMLSelectElement, SelectFormProps>(
  ({ label, labelFor, error, placeholder, options, ...props }, ref) => {
    return (
      <Field>
        <FieldLabel htmlFor={labelFor}>{label}</FieldLabel>
        <NativeSelect
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          {...props}
          size="default"
        >
          {placeholder && (
            <NativeSelectOption value="">{placeholder}</NativeSelectOption>
          )}
          {options.map((option) => (
            <NativeSelectOption key={option.id} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {error && <FieldError>{error}</FieldError>}
      </Field>
    );
  }
);
import { Field, FieldError, FieldLabel } from "../ui";
import { Input } from "../ui/Input";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
  error?: string;
  placeholder: string;
  type: string;
}

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, htmlFor, error, placeholder, type, ...props }, ref) => {
    return (
      <Field>
        <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
        <Input
          ref={ref}
          placeholder={placeholder}
          type={type}
          aria-invalid={error ? "true" : "false"}
          {...props}
          id={htmlFor}
        />
        {error && <FieldError>{error}</FieldError>}
      </Field>
    );
  }
);
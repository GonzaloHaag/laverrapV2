import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Alert, AlertTitle, Button, Field, FieldDescription, FieldError, FieldGroup, FieldLabel, Input } from "../ui";
import { InputPassword } from "../shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import { authService } from "@/services";
import { InfoIcon } from "lucide-react";
import { PRIVATE_ROUTES } from "@/utils/routes";
export const LoginForm = () => {
  const [errorMessageBackend, setErrorMessageBackend] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit"
  });

  const onSubmit = handleSubmit(async(data) => {
    setErrorMessageBackend(null);
    try {
      const response = await authService.login({ email: data.email, password: data.password });
      console.log("Login exitoso", response);
      navigate(PRIVATE_ROUTES.DASHBOARD.path);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessageBackend(error.message);
      } else {
        setErrorMessageBackend("Ocurrió un error desconocido");
      }
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {
            errors.email && <FieldError>{errors.email.message}</FieldError>
          }
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <InputPassword {...register("password")} />
          {
            errors.password && <FieldError>{errors.password.message}</FieldError>
          }
        </Field>
        {
          errorMessageBackend && (
            <Alert variant={"destructive"}>
              <InfoIcon />
              <AlertTitle>{errorMessageBackend}</AlertTitle>
            </Alert>
          )
        }
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            Ingresar
          </Button>
          <FieldDescription className="text-center">
              Aún no tienes cuenta? <Link to={"#"}>Registrarse</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};
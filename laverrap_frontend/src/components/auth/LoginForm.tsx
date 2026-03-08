import { Link } from "react-router";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, FieldDescription, FieldGroup, FieldLabel, Input } from "../ui";
import { InputPassword } from "../shared";

export const LoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-center">Bienvenido</CardTitle>
        <CardDescription className="text-center">
           Ingresá tus credenciales para acceder al sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <InputPassword />
            </Field>
            <Field>
              <Button type="submit">Ingresar</Button>
              <FieldDescription className="text-center">
                  Aún no tienes cuenta? <Link to={"#"}>Registrarse</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button, Input } from "../ui";

export const InputPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="relative">
      <Input id="password" type={showPassword ? "text" : "password"} required placeholder="Contraseña" />
      <Button type="button" variant={"ghost"} size={"icon"} className="absolute top-0 bottom-0 my-auto mx-0 right-0 pr-4" onClick={toggleShowPassword}>
        {showPassword ? <EyeOffIcon className=" text-gray-400" size={24} /> : <EyeIcon className=" text-gray-400" size={24} />}
      </Button>
    </div>
  );
};
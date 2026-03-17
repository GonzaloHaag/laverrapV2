import { SearchIcon } from "lucide-react";
import { Input } from "../ui";
import type { InputHTMLAttributes } from "react";
export const InputSearch = ({ placeholder, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative w-full max-w-md">
      <SearchIcon size={20} className="text-gray-500 absolute my-auto mx-0 top-0 bottom-0 left-2" />
      <Input name="search" type="search" placeholder={placeholder} className="block w-full px-8" {...props} />
    </div>
  );
};

import { employeeService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeeService.getAll,
  });
};
import { serviceService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: serviceService.getAll
  });
};
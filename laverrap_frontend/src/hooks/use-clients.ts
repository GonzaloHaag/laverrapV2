import { clientService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: clientService.getAll,
  });
}; 
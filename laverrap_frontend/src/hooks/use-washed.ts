
import { washingService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useWashed = () => {
  return useQuery({
    queryKey: ["washed"],
    queryFn: washingService.getAll
  });
};
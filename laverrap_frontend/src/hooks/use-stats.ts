import { statsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: statsService.getStats
  });
};
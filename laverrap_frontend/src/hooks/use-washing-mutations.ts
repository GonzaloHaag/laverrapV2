

import { washingService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useWashingMutations = () => {
  const queryClient = useQueryClient();
  const invalidateWashed = () => queryClient.invalidateQueries({ queryKey: ["washed"] });
  const invalidateEmployees = () => queryClient.invalidateQueries({ queryKey: ["employees"] });
  const invalidateStats = () => queryClient.invalidateQueries({ queryKey: ["stats"] });
  const mutationCreate = useMutation({
    mutationFn: washingService.create,
    onSuccess: invalidateWashed
  });

  const mutationUpdateStatus = useMutation({
    mutationFn: washingService.updateStatus,
    onSuccess: async (data) => {
      await invalidateWashed();
      if(data.status === "COMPLETED") {
        await Promise.all([invalidateEmployees(), invalidateStats()]);
      }
    }
  });

  const mutationDelete = useMutation({
    mutationFn: washingService.delete,
    onSuccess: invalidateWashed
  });

  return {
    mutationCreate,
    mutationDelete,
    mutationUpdateStatus,
  };
};
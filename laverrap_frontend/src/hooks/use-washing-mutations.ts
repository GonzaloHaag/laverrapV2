

import { washingService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useWashingMutations = () => {
  const queryClient = useQueryClient();
  const invalidateWashed = () => queryClient.invalidateQueries({ queryKey: ["washed"] });
  const mutationCreate = useMutation({
    mutationFn: washingService.create,
    onSuccess: invalidateWashed
  });

  const mutationUpdateStatus = useMutation({
    mutationFn: washingService.updateStatus,
    onSuccess: invalidateWashed
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
import { serviceService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useServiceMutations = () => {
  const queryClient = useQueryClient();
  const invalidateServices = () => queryClient.invalidateQueries({ queryKey: ["services"] });
  const mutationCreate = useMutation({
    mutationFn: serviceService.create,
    onSuccess: invalidateServices
  });

  const mutationUpdate = useMutation({
    mutationFn: serviceService.update,
    onSuccess: invalidateServices
  });

  const mutationDelete = useMutation({
    mutationFn: serviceService.delete,
    onSuccess: invalidateServices
  });

  return {
    mutationCreate,
    mutationUpdate,
    mutationDelete,
  };
};

import { clientService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useClientMutations = () => {
  const queryClient = useQueryClient();
  const invalidateClients = () => queryClient.invalidateQueries({ queryKey: ["clients"] });
  const mutationCreate = useMutation({
    mutationFn: clientService.create,
    onSuccess: invalidateClients
  });

  const mutationUpdate = useMutation({
    mutationFn: clientService.update,
    onSuccess: invalidateClients
  });

  const mutationDeactivate = useMutation({
    mutationFn: clientService.deactivate,
    onSuccess: invalidateClients
  });

  return {
    mutationCreate,
    mutationUpdate,
    mutationDeactivate,
  };
};
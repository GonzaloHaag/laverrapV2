
import { clientService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useClientMutations = () => {
  const queryClient = useQueryClient();
  const invalidateClients = () => queryClient.invalidateQueries({ queryKey: ["clients"] });
  const invalidateStats = () => queryClient.invalidateQueries({ queryKey: ["stats"] });
  const mutationCreate = useMutation({
    mutationFn: clientService.create,
    onSuccess: (data) => {
      invalidateClients();
      if(data.status === "ACTIVE") {
        invalidateStats();
      }
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: clientService.update,
    onSuccess: () => {
      invalidateClients();
      invalidateStats();
    }
  });

  const mutationDeactivate = useMutation({
    mutationFn: clientService.deactivate,
    onSuccess: () => {
      invalidateClients();
      invalidateStats();
    }
  });

  return {
    mutationCreate,
    mutationUpdate,
    mutationDeactivate,
  };
};
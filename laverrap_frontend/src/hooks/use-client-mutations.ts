
import { clientService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useClientMutations = () => {
  const queryClient = useQueryClient();
  const invalidateClients = () => queryClient.invalidateQueries({ queryKey: ["clients"] });
  const invalidateStats = () => queryClient.invalidateQueries({ queryKey: ["stats"] });
  const mutationCreate = useMutation({
    mutationFn: clientService.create,
    onSuccess: async (data) => {
      await invalidateClients();
      if(data.status === "ACTIVE") {
        await invalidateStats();
      }
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: clientService.update,
    onSuccess: async () => {
      await Promise.all([invalidateClients(), invalidateStats()]);
    }
  });

  const mutationDeactivate = useMutation({
    mutationFn: clientService.deactivate,
    onSuccess: async () => {
      await Promise.all([invalidateClients(), invalidateStats()]);
    }
  });

  return {
    mutationCreate,
    mutationUpdate,
    mutationDeactivate,
  };
};

import { employeeService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useEmployeeMutations = () => {
  const invalidateEmployees = () => queryClient.invalidateQueries({ queryKey: ["employees"] });
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: employeeService.create,
    onSuccess: invalidateEmployees
  });

  const mutationUpdate = useMutation({
    mutationFn: employeeService.update,
    onSuccess: invalidateEmployees
  });

  const mutationDeactivate = useMutation({
    mutationFn: employeeService.deactivate,
    onSuccess: invalidateEmployees
  });

  return {
    mutationCreate,
    mutationUpdate,
    mutationDeactivate,
  };
};
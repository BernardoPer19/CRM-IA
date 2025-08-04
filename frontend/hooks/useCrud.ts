// useCrud.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CrudOptions<TData, TCreate = TData, TUpdate = TData, TDeleteId = string | number> = {
  key: string;
  queryFn?: () => Promise<TData[]>;
  createFn?: (data: TCreate) => Promise<any>;
  updateFn?: (data: TUpdate) => Promise<any>;
  deleteFn?: (id: TDeleteId) => Promise<any>;
};

export const useCrud = <TData, TCreate = TData, TUpdate = TData, TDeleteId = string | number>(
  options: CrudOptions<TData, TCreate, TUpdate, TDeleteId>
) => {
  const queryClient = useQueryClient();

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (context: string, error: any) => {
    console.error(`❌ Error en ${context}:`, error);
    toast.error(error?.response?.data?.message || `Error en ${context}`);
  };

  const emptyQuery = async (): Promise<TData[]> => {
    return [];
  };

  const noopMutation = async () => ({});

  const list = useQuery<TData[], Error>({
    queryKey: [options.key],
    queryFn: options.queryFn || emptyQuery,
    enabled: !!options.queryFn,
  });

  const create = useMutation({
    mutationFn: options.createFn || noopMutation,
    onSuccess: (data: any) => {
      notifySuccess(data?.message || "Creado con éxito");
      queryClient.invalidateQueries({ queryKey: [options.key] });
    },
    onError: (error) => notifyError("crear", error),
  });

  const update = useMutation({
    mutationFn: options.updateFn || noopMutation,
    onSuccess: (data: any) => {
      notifySuccess(data?.message || "Actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: [options.key] });
    },
    onError: (error) => notifyError("actualizar", error),
  });

  const remove = useMutation({
    mutationFn: options.deleteFn || noopMutation,
    onSuccess: (data: any) => {
      notifySuccess(data?.message || "Eliminado con éxito");
      queryClient.invalidateQueries({ queryKey: [options.key] });
    },
    onError: (error) => notifyError("eliminar", error),
  });

  return {
    list: options.queryFn ? list : null,
    create: options.createFn ? create : null,
    update: options.updateFn ? update : null,
    remove: options.deleteFn ? remove : null,
  };
};

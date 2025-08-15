// hooks/useMessages.ts
import { getMessages, sendMessage } from "@/lib/api/messageReq";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { MessageType } from "@/types/MessagesType";

export function useMessages() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<MessageType[]>({
    queryKey: ["messages"],
    queryFn: async () => (await getMessages()).data,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    onMutate: async (newMessage: Partial<MessageType>) => {
      await queryClient.cancelQueries({ queryKey: ["messages"] });

      const prevMessages = queryClient.getQueryData<MessageType[]>(["messages"]);

      if (prevMessages) {
        queryClient.setQueryData<MessageType[]>(["messages"], [
          ...prevMessages,
          {
            ...newMessage,
            id: `temp-${Date.now()}`,
            createdAt: new Date().toISOString(),
            emisor: newMessage.emisor ?? "ADMIN",
          } as MessageType,
        ]);
      }

      return { prevMessages };
    },
    onError: (_err, _newMessage, context) => {
      if (context?.prevMessages) {
        queryClient.setQueryData(["messages"], context.prevMessages);
      }
    },
    onSuccess: (response, newMessage) => {
      // Reemplaza el mensaje temporal con el real del backend
      const current = queryClient.getQueryData<MessageType[]>(["messages"]) || [];
      queryClient.setQueryData<MessageType[]>(["messages"], [
        ...current.filter(msg => !msg.id.startsWith("temp-")),
        response.data,
      ]);
    },
  });

  return {
    messages: data || [],
    isLoading,
    error,
    sendMessage: mutation.mutate,
    sendMessageAsync: mutation.mutateAsync,
  };
}

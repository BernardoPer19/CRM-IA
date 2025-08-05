import { loginRequest, registerRequest, getCurrentUser, logoutRequest } from '@/lib/api/authReq';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner'


export const useAuth = () => {

    const queryClient = useQueryClient();

    const handleSuccess = (message: string) => {
        toast.success(message);
    };

    const handleError = (context: string, error: any) => {
        console.error(`❌ Error en ${context}:`, error);
    };


    const register = useMutation({
        mutationFn: registerRequest,
        onSuccess: (data) => {
            // data ya contiene { success, message, user }
            if (data?.success) {
                handleSuccess(data.message);
                queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            } else {
                handleError("registro", new Error("Error inesperado en registro"));
            }
        },
        onError: (error) => {
            handleError("registro", error);

        },
    });




    const login = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            handleSuccess(data.message);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onError: (error) => {
            handleError("registro", error);
        },
    })

    const logout = useMutation({
        mutationFn: logoutRequest,
        onSuccess: (data) => {
            handleSuccess(data.message);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onError: (error) => {
            handleError("logout", error);
        },
    });

    const getUserProfile = useQuery({
        refetchOnWindowFocus: false,
        queryKey: ["currentUser"],
        staleTime: 1000 * 60 * 5,
        queryFn: getCurrentUser,
        enabled: false,
    })

    return {
        register,
        login,
        logout,
        getUserProfile
    }
}
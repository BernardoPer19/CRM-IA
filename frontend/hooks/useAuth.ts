import { loginRequest, registerRequest, getCurrentUser } from '@/lib/api/authReq';
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
            handleSuccess(data.data.message);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onError: (error) => {
            handleError("registro", error);
        },
    })



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
        mutationFn: loginRequest,
        onSuccess: (data) => {
            handleSuccess(data.message);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onError: (error) => {
            handleError("registro", error);
        },
    })


    const getUserProfile = useQuery({
        queryKey: ["profile_key"],
        queryFn: getCurrentUser,
    })

    return {
        register,
        login,
        logout,
        getUserProfile
    }
}
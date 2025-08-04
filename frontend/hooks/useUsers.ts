import { useCrud } from "./useCrud";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "@/lib/api/usersReq";
import { UserType } from "@/types/AuthType";

export const useUsers = () =>
  useCrud<UserType, UserType, { id: string; data: Partial<UserType> }, string>({
    key: "users",
    queryFn: getUsers,
    updateFn: updateUser,
    deleteFn: deleteUser,
  });

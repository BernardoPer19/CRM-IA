import { useCrud } from "./useCrud";
import {
  updateUser,
  deleteUser,
} from "@/lib/api/usersReq";
import { UserType } from "@/types/AuthType";

export const useUsers = () =>
  useCrud<UserType, UserType, { id: string; data: Partial<UserType> }, string>({
    key: "users",
    updateFn: updateUser,
    deleteFn: deleteUser,
  });

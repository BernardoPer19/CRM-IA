import { RegisterUser } from "../../features/auth/types/interfaces/userInterface";
import { UserType } from "../AuthType";

export { };

declare global {
  namespace Express {
    interface Request {
      user?: RegisterUser;
    }
  }
}
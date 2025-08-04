

export type Role = "ADMIN" | "EMPLOYEE" 

export interface UserType {
    id: string
    userName: string;
    name: string;
    lastName: string;
    email: string;
    phone: number;
    img: string;
    role: Role;
    password: string;
    createdAt: Date;
}

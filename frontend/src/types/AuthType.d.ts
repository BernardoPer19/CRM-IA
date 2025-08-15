import { ClientType } from "./ClientType";


export type Role = "ADMIN" | "EMPLOYEE"

export interface UserType {
  id: string;
  name: string;
  lastName: string;
  phone: number;
  img?: string | null;
  email: string;
  password: string;
  role: Role;
  clients?: ClientType[]; 
//   mensajesCreados?: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface logintype {
    email: string;
    password: string;
}


export interface registerType {
    name: string
    lastName: string
    phone: number
    img: string
    email: string
    password: string
}


export interface UserAppType {
    success: boolean;
    user:    User;
}

export interface User {
    name:     string;
    email:    string;
    password: string;
    img:      string;
    lastName: string;
    phone:    number;
    role:     string;
}




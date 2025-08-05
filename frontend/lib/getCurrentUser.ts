// lib/getCurrentUser.ts
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

type UserPayload = {
  id: string;
  email: string;
  phone: string;
  name: string;
  lastName: string;
  role: string;
  createdAt: string;
};

export async function getCurrentUser(): Promise<UserPayload | null> {
  const token = (await cookies()).get("access_token")?.value; // CON AWAIT POR Q ES NEST 15

  if (!token) return null;

  try {
    const jwtSecret = process.env.JWT_PASSWORD;
    if (!jwtSecret) throw new Error("JWT_PASSWORD not defined");

    const user = verify(token, jwtSecret) as UserPayload;
    return user;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

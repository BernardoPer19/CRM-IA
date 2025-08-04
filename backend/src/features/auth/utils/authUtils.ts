// authUtils.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserType } from "../../../types/authType.js";

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);
    return comparedPassword;
};

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};


type userPayload = Pick<UserType, "id" | "email" | "phone" | "createdAt" | "role" | "name" | "lastName">

export const createToken = (user: userPayload): string => {
    const jwtSecret = process.env.JWT_PASSWORD;
    if (!jwtSecret) {
        throw new Error("JWT_PASSWORD environment variable is not defined");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            phone: user.phone,
            name: user.name,
            lastName: user.lastName,
            role: user.role,
            createdAt: user.createdAt
        },
        jwtSecret,
        { expiresIn: "24h" }
    );
    console.log(token);

    return token;
};
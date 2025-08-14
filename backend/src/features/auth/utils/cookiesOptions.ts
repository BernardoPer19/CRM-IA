import type { CookieOptions } from "express";


export const getCookieOptions = (): CookieOptions => ({
    httpOnly: true, // para seguridad
    secure: process.env.NODE_ENV === "production", // en prod solo con HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
});
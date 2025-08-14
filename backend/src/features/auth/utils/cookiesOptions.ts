import type { CookieOptions } from "express";


export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Solo en producción
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
});
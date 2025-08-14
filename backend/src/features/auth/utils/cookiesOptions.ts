import type { CookieOptions } from "express";

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true, // Solo accesible desde el servidor
  secure: true, // Requiere HTTPS
  sameSite: "none", // Compatible con cookies cross-site
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
});

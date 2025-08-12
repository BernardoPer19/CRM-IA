import type { CookieOptions } from "express";

export const options: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true solo en producción
  sameSite: "lax",
  path: "/",
};

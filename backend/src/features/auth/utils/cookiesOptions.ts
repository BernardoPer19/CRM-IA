import type { CookieOptions } from "express";

export const options: CookieOptions = {
   httpOnly: true,
  secure: false, // en dev
  sameSite: "lax",
  path: "/",
};
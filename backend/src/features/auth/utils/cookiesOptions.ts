import type { CookieOptions } from "express";

export const options: CookieOptions = {
    httpOnly: true,
    secure: true,           
    sameSite: "none",      
    maxAge: 1000 * 60 * 60 * 24 * 7, 
};
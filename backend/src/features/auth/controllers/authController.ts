import { catchAsync } from "../../../middlewares/catchAsync.js";
import { UserType } from "../../../types/authType.js";
import { validateLogin, validateRegister } from "../schemas/authSchema.js";
import type { AuthServices } from "../services/authServices.js";
import { createToken, hashPassword } from "../utils/authUtils.js";
import { getCookieOptions } from "../utils/cookiesOptions.js";
export class AuthController {
  constructor(private readonly service: AuthServices) { }

  public register = catchAsync(async (req, res, _next) => {
    const validatedData = validateRegister(req.body);
    const hashedPassword = await hashPassword(validatedData.password);

    const newUser = await this.service.RegisterUser({
      ...validatedData,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  });


  public login = catchAsync(async (req, res, _next) => {
    const { email, password } = validateLogin(req.body);

    const user = await this.service.LoginValidateService({ email, password });

    const token = createToken({
      id: user.id,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      role: user.role,
      name: user.name,
      lastName: user.lastname,
    });

    // Siempre para frontend
    res.cookie("access_token", token, getCookieOptions());

    if (user.role === "IA") {
      return res.json({
        message: "¡Sesión iniciada correctamente!",
        access_token: token, 
        expires_in: 3600, 
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      });
    }

    // Otros roles → sin token en body
    res.json({
      message: "¡Sesión iniciada correctamente!",
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  });


  public logout = catchAsync(async (_req, res, _next) => {
    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "Sesión cerrada correctamente",
    });
  });

  public getProfile = catchAsync(async (req, res, _next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const userId = req.user.id;
    console.log(userId);
    const profile = await this.service.getUserProfile(userId);
    res.status(200).json({ success: true, user: profile });
  });


  public getProfileData = catchAsync(async (req, res, _next) => {
    const user = req.user as UserType;

    if (!user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return
    }


    res.status(200).json(user);
    const profile = await this.service.getUserProfile(user.id);
    res.status(200).json({ success: true, user: profile });
  });

}
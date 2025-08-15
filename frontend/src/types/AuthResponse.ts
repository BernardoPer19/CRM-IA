interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    phone: number;
    createdAt: string;  // o Date, según cómo manejes
    name: string;
    lastname: string;
    role: "ADMIN" | "EMPLOYEE"; // según tus roles
  };
}
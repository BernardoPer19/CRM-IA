interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    phone: number;
    createdAt: string; 
    name: string;
    lastname: string;
    role: "ADMIN" | "EMPLEADO"; 
  };
}
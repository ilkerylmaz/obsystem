export type Role = "ADMIN" | "TEACHER" | "STUDENT";

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    roles: string[];
    username: string;
}

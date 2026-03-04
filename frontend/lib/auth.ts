import { jwtDecode } from "jwt-decode";

export type Role = "ADMIN" | "TEACHER" | "STUDENT";

interface JwtPayload {
    sub: string;
    role: Role;
    exp: number;
}

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
}

export function setToken(token: string): void {
    localStorage.setItem("token", token);
}

export function removeToken(): void {
    localStorage.removeItem("token");
}

export function getPayload(): JwtPayload | null {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
}

export function getUsername(): string | null {
    return getPayload()?.sub ?? null;
}

export function getRole(): Role | null {
    return getPayload()?.role ?? null;
}

export function isAuthenticated(): boolean {
    const payload = getPayload();
    if (!payload) return false;
    return payload.exp * 1000 > Date.now();
}

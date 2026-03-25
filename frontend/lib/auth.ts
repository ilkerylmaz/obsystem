import { jwtDecode } from "jwt-decode";

export type Role = "ADMIN" | "TEACHER" | "STUDENT";
const ROLE_PREFIX = "ROLE_";

interface JwtPayload {
    sub: string;
    role?: Role | string;
    roles?: string[] | string;
    exp: number;
}

function normalizeRole(rawRole: string): Role | null {
    const cleanedRole = rawRole.trim().toUpperCase().replace(ROLE_PREFIX, "");
    if (cleanedRole === "ADMIN" || cleanedRole === "TEACHER" || cleanedRole === "STUDENT") {
        return cleanedRole;
    }
    return null;
}

function getFirstRole(rawRoles: unknown): string | null {
    if (Array.isArray(rawRoles)) {
        const firstRole = rawRoles.find((value): value is string => typeof value === "string" && value.trim().length > 0);
        return firstRole ?? null;
    }

    if (typeof rawRoles === "string" && rawRoles.trim().length > 0) {
        return rawRoles.split(",")[0]?.trim() ?? null;
    }

    return null;
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
    const payload = getPayload();
    if (!payload) return null;

    const roleFromRoles = getFirstRole(payload.roles);
    if (roleFromRoles) {
        return normalizeRole(roleFromRoles);
    }

    if (typeof payload.role === "string") {
        return normalizeRole(payload.role);
    }

    return null;
}

export function isAuthenticated(): boolean {
    const payload = getPayload();
    if (!payload) return false;
    return payload.exp * 1000 > Date.now();
}

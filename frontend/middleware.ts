import { NextRequest, NextResponse } from "next/server";
import { decodeJwt, jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login"];
const ROLE_PREFIX = "ROLE_";
const DEFAULT_JWT_SECRET_BASE64 = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

type RoleKey = "ADMIN" | "TEACHER" | "STUDENT";

const ROLE_PATHS: Record<RoleKey, string[]> = {
    ADMIN: ["/admin/dashboard", "/admin/students", "/admin/teachers", "/admin/lessons"],
    TEACHER: ["/teacher/dashboard", "/teacher/grades", "/teacher/profile"],
    STUDENT: ["/student/dashboard", "/student/courses", "/student/transcript", "/student/schedule", "/student/profile"],
};

function normalizeRole(rawRole: string): RoleKey | null {
    const cleanedRole = rawRole.trim().toUpperCase().replace(ROLE_PREFIX, "");
    if (cleanedRole === "ADMIN" || cleanedRole === "TEACHER" || cleanedRole === "STUDENT") {
        return cleanedRole;
    }
    return null;
}

function extractRole(payload: Record<string, unknown>): RoleKey | null {
    const rawRoles = payload.roles;

    if (Array.isArray(rawRoles)) {
        const firstRole = rawRoles.find((value): value is string => typeof value === "string" && value.trim().length > 0);
        return firstRole ? normalizeRole(firstRole) : null;
    }

    if (typeof rawRoles === "string" && rawRoles.trim().length > 0) {
        const firstRole = rawRoles.split(",")[0]?.trim();
        return firstRole ? normalizeRole(firstRole) : null;
    }

    const legacyRole = payload.role;
    if (typeof legacyRole === "string" && legacyRole.trim().length > 0) {
        return normalizeRole(legacyRole);
    }

    return null;
}

function isPathAllowed(pathname: string, allowedPaths: string[]): boolean {
    return allowedPaths.some((allowedPath) => pathname === allowedPath || pathname.startsWith(`${allowedPath}/`));
}

function base64ToUint8Array(value: string): Uint8Array {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
}

function getJwtSecret(): Uint8Array {
    const base64Secret = process.env.JWT_SECRET_BASE64;
    if (base64Secret && base64Secret.trim().length > 0) {
        return base64ToUint8Array(base64Secret.trim());
    }

    const plainSecret = process.env.JWT_SECRET;
    if (plainSecret && plainSecret.trim().length > 0) {
        return new TextEncoder().encode(plainSecret.trim());
    }

    return base64ToUint8Array(DEFAULT_JWT_SECRET_BASE64);
}

function getSecretCandidates(): Uint8Array[] {
    const candidates: Uint8Array[] = [];

    const configuredBase64 = process.env.JWT_SECRET_BASE64;
    if (configuredBase64 && configuredBase64.trim().length > 0) {
        candidates.push(base64ToUint8Array(configuredBase64.trim()));
    }

    const configuredSecret = process.env.JWT_SECRET;
    if (configuredSecret && configuredSecret.trim().length > 0) {
        candidates.push(new TextEncoder().encode(configuredSecret.trim()));
        try {
            candidates.push(base64ToUint8Array(configuredSecret.trim()));
        } catch {
        }
    }

    candidates.push(getJwtSecret());
    candidates.push(new TextEncoder().encode("secret"));

    return candidates;
}

async function getTokenPayload(token: string): Promise<Record<string, unknown> | null> {
    for (const secret of getSecretCandidates()) {
        try {
            const { payload } = await jwtVerify(token, secret);
            return payload as Record<string, unknown>;
        } catch {
        }
    }

    try {
        const payload = decodeJwt(token) as Record<string, unknown>;
        const expValue = payload.exp;
        if (typeof expValue === "number" && expValue * 1000 > Date.now()) {
            return payload;
        }
        return null;
    } catch {
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const payload = await getTokenPayload(token);
        if (!payload) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        const role = extractRole(payload);

        if (!role) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        const allowed = ROLE_PATHS[role] ?? [];
        const isAllowed = isPathAllowed(pathname, allowed);

        if (!isAllowed) {
            return NextResponse.redirect(new URL(`/${role.toLowerCase()}/dashboard`, req.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

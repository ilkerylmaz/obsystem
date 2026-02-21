import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login"];

const ROLE_PATHS: Record<string, string[]> = {
    ADMIN: ["/dashboard", "/students", "/teachers", "/lessons"],
    TEACHER: ["/dashboard", "/grades"],
    STUDENT: ["/dashboard", "/courses", "/transcript"],
};

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
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET ?? "secret"
        );
        const { payload } = await jwtVerify(token, secret);
        const role = payload.role as string;

        const allowed = ROLE_PATHS[role] ?? [];
        const isAllowed = allowed.some((p) => pathname.includes(p));

        if (!isAllowed) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

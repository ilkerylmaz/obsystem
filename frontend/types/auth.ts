export interface JwtPayload {
    userId: number; // Backend'de Long demiştik, TS'de number olur
    sub: string;    // Username
    roles: string;  // "ROLE_USER,ROLE_ADMIN" formatında
    iat: number;    // Issued at
    exp: number;    // Expiration
}
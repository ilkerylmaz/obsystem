import { useState, useEffect } from 'react';
import { authManager } from '../utils/authManager';
import { JwtPayload } from '../types/auth';

export const useAuth = () => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const currentUser = authManager.getUser();
        setUser(currentUser);
        setLoading(false);
    }, []);
    function normalizeRole(rawRole?: string | null): string | null {
        if (!rawRole) return null;

        const first = rawRole.split(",")[0].trim(); // "ROLE_STUDENT,ROLE_ADMIN" varsa ilkini al
        return first.replace(/^ROLE_/, "");         // ROLE_ önekini çıkar
    }
    return {
        user,
        role: normalizeRole(user?.roles),
        userId: user?.userId,
        isAuthenticated: !!user,
        loading,
        logout: authManager.logout
    };
};
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/auth';

class AuthManager {
    private readonly TOKEN_KEY = 'token';

    getToken(): string | undefined {
        return Cookies.get(this.TOKEN_KEY);
    }

    getUser(): JwtPayload | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            // jwtDecode'a tipini jenerik olarak veriyoruz
            return jwtDecode<JwtPayload>(token);
        } catch (error) {
            console.error("Geçersiz Token", error);
            return null;
        }
    }

    getUserId(): number | null {
        return this.getUser()?.userId ?? null;
    }

    logout(): void {
        Cookies.remove(this.TOKEN_KEY);
        window.location.href = '/login';
    }
}

export const authManager = new AuthManager();
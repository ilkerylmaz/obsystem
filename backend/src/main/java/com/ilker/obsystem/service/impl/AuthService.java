package com.ilker.obsystem.service.impl;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.ilker.obsystem.dto.request.AuthRequest;
import com.ilker.obsystem.dto.response.AuthResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse authenticate(AuthRequest request) {
        // 1. Kullanıcıyı doğrula
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        // 2. Token üret
        String token = jwtService.generateToken(auth);

        // 3. Kullanıcı bilgilerini ve rollerini çekip dön (dahili Spring Security authority'lerini filtrele)
        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(a -> a.startsWith("ROLE_"))
                .toList();

        return new AuthResponse(token, request.username(), roles);
    }



}

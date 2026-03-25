package com.ilker.obsystem.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ilker.obsystem.dto.request.AuthRequest;
import com.ilker.obsystem.dto.response.AuthResponse;
import com.ilker.obsystem.entity.User;
import com.ilker.obsystem.repository.AuthRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AuthRepository authRepository;

    public AuthResponse authenticate(AuthRequest request) {
        // 1. Kullanıcıyı doğrula
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        User user = authRepository.findByUsername(request.username())
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + request.username()));

        // 2. Token üret
        String token = jwtService.generateToken(auth, user.getId());

        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).filter(Objects::nonNull)
                .filter(a -> a.startsWith("ROLE_"))
                .toList();

        return new AuthResponse(token, request.username(), roles);
    }



}

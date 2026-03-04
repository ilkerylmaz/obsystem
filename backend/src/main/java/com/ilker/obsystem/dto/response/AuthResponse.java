package com.ilker.obsystem.dto.response;

import java.util.List;

public record AuthResponse(
        String token,
        String username,
        List<String> roles
) {
}

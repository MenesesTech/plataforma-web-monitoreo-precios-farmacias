package femt.sistema_precios.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import femt.sistema_precios.dto.AuthRequestDTO;
import femt.sistema_precios.dto.AuthResponseDTO;
import femt.sistema_precios.service.JwtTokenService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Value("${app.admin.key}")
    private String adminKey;

    private final JwtTokenService jwtTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO request) {
        if (!adminKey.equals(request.getApiKey())) {
            return ResponseEntity.status(401).body("API Key inválida");
        }

        String token = jwtTokenService.generateToken();
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

    @PostMapping("/token")
    public ResponseEntity<?> generateToken(@RequestBody AuthRequestDTO request) {
        if (!adminKey.equals(request.getApiKey())) {
            return ResponseEntity.status(401).body("API Key inválida");
        }

        // Token con expiración personalizada (por ejemplo, 1 hora)
        String token = jwtTokenService.generateTokenWithCustomExpiration(3600000); // 1 hora
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }
}
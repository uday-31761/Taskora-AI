package com.etharaai.dto;
import lombok.Data;
import lombok.AllArgsConstructor;
import com.etharaai.model.User;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private User user;
}

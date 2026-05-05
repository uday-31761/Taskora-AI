package com.etharaai.controller;

import com.etharaai.model.User;
import com.etharaai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // @GetMapping("/me")
    // public ResponseEntity<User> getCurrentUser(Authentication authentication) {
    //     return ResponseEntity.ok(userService.findByEmail(authentication.getName()));
    // }
//     @GetMapping("/me")
// public ResponseEntity<User> getCurrentUser(Authentication authentication) {

//     User user = (User) authentication.getPrincipal();  // ✅ FIX

//     return ResponseEntity.ok(user);
// }

@GetMapping("/me")
public ResponseEntity<User> getCurrentUser(Authentication authentication) {

    if (authentication == null || authentication.getPrincipal() == null) {
        throw new RuntimeException("User not authenticated");
    }

    User user = (User) authentication.getPrincipal();

    return ResponseEntity.ok(user);
}
}

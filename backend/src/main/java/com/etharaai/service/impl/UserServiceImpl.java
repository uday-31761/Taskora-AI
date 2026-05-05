package com.etharaai.service.impl;

import com.etharaai.dto.RegisterRequest;
import com.etharaai.model.Role;
import com.etharaai.model.User;
import com.etharaai.repository.UserRepository;
import com.etharaai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Random random = new Random();

    @Override
    public User registerUser(RegisterRequest request, Role role) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use.");
        }

        Integer generatedId = generateUniqueId(role);

        User user = User.builder()
                .id(generatedId)
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Integer generateUniqueId(Role role) {
        Integer id;
        do {
            if (role == Role.ADMIN) {
                // 2 digits
                id = 10 + random.nextInt(90);
            } else {
                // 4 digits
                id = 1000 + random.nextInt(9000);
            }
        } while (userRepository.existsById(id));
        return id;
    }
}

package com.etharaai.service;

import com.etharaai.dto.RegisterRequest;
import com.etharaai.model.User;
import com.etharaai.model.Role;
import java.util.List;

public interface UserService {
    User registerUser(RegisterRequest request, Role role);
    User findByEmail(String email);
    List<User> getAllUsers();
    User getUserById(Integer id);
}

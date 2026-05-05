package com.etharaai.controller;

import com.etharaai.service.TaskService;
import com.etharaai.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final TaskService taskService;

    // @GetMapping("/stats")
    // public ResponseEntity<Map<String, Object>> getStats(Authentication authentication) {
    //     return ResponseEntity.ok(taskService.getDashboardStats(authentication.getName()));
    // }

    @GetMapping("/stats")
public ResponseEntity<Map<String, Object>> getStats(Authentication authentication) {

    User user = (User) authentication.getPrincipal();  // ✅ correct

    return ResponseEntity.ok(
        taskService.getDashboardStats() // ✅ pass email
    );
}
}

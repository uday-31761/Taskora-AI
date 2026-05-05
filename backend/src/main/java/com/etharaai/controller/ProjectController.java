package com.etharaai.controller;

import com.etharaai.dto.ProjectRequest;
import com.etharaai.model.Project;
import com.etharaai.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // @PostMapping
    // public ResponseEntity<Project> createProject(@RequestBody ProjectRequest request, Authentication authentication) {
    //     Project project = projectService.createProject(request, authentication.getName());
    //     return ResponseEntity.ok(project);
    // }

    // @GetMapping
    // public ResponseEntity<List<Project>> getProjects(Authentication authentication) {
    //     return ResponseEntity.ok(projectService.getProjectsForUser(authentication.getName()));
    // }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest request) {
        Project project = projectService.createProject(request);
        return ResponseEntity.ok(project);
    }
    
    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(projectService.getProjectsForUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.updateProject(id, request));
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<Project> addMember(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(projectService.addMemberToProject(id, body.get("email")));
    }
}

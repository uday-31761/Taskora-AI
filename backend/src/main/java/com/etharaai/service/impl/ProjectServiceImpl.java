package com.etharaai.service.impl;

import com.etharaai.dto.ProjectRequest;
import com.etharaai.model.Project;
import com.etharaai.model.User;
import com.etharaai.model.Role;
import com.etharaai.repository.ProjectRepository;
import com.etharaai.service.ProjectService;
import com.etharaai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserService userService;

    // @Override
    // public Project createProject(ProjectRequest request, String createdByEmail) {
    //     User creator = userService.findByEmail(createdByEmail);

    //     Set<User> initialMembers = new HashSet<>();
    //     initialMembers.add(creator);

    //     Project project = Project.builder()
    //             .name(request.getName())
    //             .description(request.getDescription())
    //             .createdBy(creator)
    //             .members(initialMembers)
    //             .build();

    //     return projectRepository.save(project);
    // }

    @Override
public Project createProject(ProjectRequest request) {

    User creator = (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    Set<User> initialMembers = new HashSet<>();
    initialMembers.add(creator);

    Project project = Project.builder()
            .name(request.getName())
            .description(request.getDescription())
            .createdBy(creator)
            .members(initialMembers)
            .build();

    return projectRepository.save(project);
}

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    // @Override
    // public List<Project> getProjectsForUser(String email) {
    //     User user = userService.findByEmail(email);
    //     if (user.getRole() == Role.ADMIN) {
    //         return projectRepository.findAll();
    //     }
    //     return projectRepository.findByMembers_Id(user.getId());
    // }

    @Override
public List<Project> getProjectsForUser() {

    User user = (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    if (user.getRole() == Role.ADMIN) {
        return projectRepository.findAll();
    }

    return projectRepository.findByMembers_Id(user.getId());
}

    @Override
    public Project updateProject(Long id, ProjectRequest request) {
        Project project = getProjectById(id);
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        return projectRepository.save(project);
    }

    @Override
    public Project addMemberToProject(Long projectId, String memberEmail) {
        Project project = getProjectById(projectId);
        User newMember = userService.findByEmail(memberEmail);
        
        project.getMembers().add(newMember);
        return projectRepository.save(project);
    }
}

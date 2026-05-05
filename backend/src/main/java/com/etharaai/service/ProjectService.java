package com.etharaai.service;

import com.etharaai.dto.ProjectRequest;
import com.etharaai.model.Project;
import java.util.List;

public interface ProjectService {
    // Project createProject(ProjectRequest request, String createdByEmail);
    Project createProject(ProjectRequest request);
    Project getProjectById(Long id);
    // List<Project> getProjectsForUser(String email);
    List<Project> getProjectsForUser();
    Project updateProject(Long id, ProjectRequest request);
    Project addMemberToProject(Long projectId, String memberEmail);
}

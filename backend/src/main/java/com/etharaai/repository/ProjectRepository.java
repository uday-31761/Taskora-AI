package com.etharaai.repository;

import com.etharaai.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByMembers_Id(Integer userId);
    List<Project> findByCreatedBy_Id(Integer userId);
}

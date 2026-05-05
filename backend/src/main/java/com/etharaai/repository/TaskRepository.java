package com.etharaai.repository;

import com.etharaai.model.Task;
import com.etharaai.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject_Id(Long projectId);
    List<Task> findByAssignedTo_Id(Integer userId);
    
    long countByProject_Id(Long projectId);
    long countByProject_IdAndStatus(Long projectId, TaskStatus status);
    
    @Query("SELECT COUNT(t) FROM Task t JOIN t.project p JOIN p.members m WHERE m.id = :userId")
    long countUserAccessibleTasks(Integer userId);
    
    @Query("SELECT COUNT(t) FROM Task t JOIN t.project p JOIN p.members m WHERE m.id = :userId AND t.status = :status")
    long countUserAccessibleTasksByStatus(Integer userId, TaskStatus status);

    @Query("SELECT COUNT(t) FROM Task t JOIN t.project p JOIN p.members m WHERE m.id = :userId AND t.dueDate < :date AND t.status != 'DONE'")
    long countOverdueTasksForUser(Integer userId, LocalDate date);
}

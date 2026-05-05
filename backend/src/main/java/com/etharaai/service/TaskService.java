package com.etharaai.service;

import com.etharaai.dto.TaskRequest;
import com.etharaai.model.Task;
import com.etharaai.model.TaskStatus;
import java.util.List;
import java.util.Map;

public interface TaskService {
    Task createTask(Long projectId, TaskRequest request);
    Task getTaskById(Long id);
    List<Task> getTasksByProjectId(Long projectId);
    Task updateTask(Long id, TaskRequest request);
    Task updateTaskStatus(Long id, TaskStatus status);
    void deleteTask(Long id);
    // Map<String, Object> getDashboardStats(String userEmail);
    Map<String, Object> getDashboardStats();
}

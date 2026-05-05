package com.etharaai.service.impl;

import com.etharaai.dto.TaskRequest;
import com.etharaai.model.Project;
import com.etharaai.model.Task;
import com.etharaai.model.TaskStatus;
import com.etharaai.model.User;
import com.etharaai.model.Role;
import com.etharaai.repository.TaskRepository;
import com.etharaai.service.ProjectService;
import com.etharaai.service.TaskService;
import com.etharaai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectService projectService;
    private final UserService userService;

    @Override
    public Task createTask(Long projectId, TaskRequest request) {
        Project project = projectService.getProjectById(projectId);
        
        User assignedTo = null;
        if (request.getAssignedToId() != null) {
            assignedTo = userService.getUserById(request.getAssignedToId());
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .project(project)
                .assignedTo(assignedTo)
                .build();

        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProject_Id(projectId);
    }

    @Override
    public Task updateTask(Long id, TaskRequest request) {
        Task task = getTaskById(id);
        
        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        
        if (request.getAssignedToId() != null) {
            User assignedTo = userService.getUserById(request.getAssignedToId());
            task.setAssignedTo(assignedTo);
        }

        return taskRepository.save(task);
    }

    @Override
    public Task updateTaskStatus(Long id, TaskStatus status) {
        Task task = getTaskById(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // @Override
    // public Map<String, Object> getDashboardStats(String userEmail) {
    //     User user = userService.findByEmail(userEmail);
    //     Map<String, Object> stats = new HashMap<>();

    //     long total = taskRepository.countUserAccessibleTasks(user.getId());
    //     long todo = taskRepository.countUserAccessibleTasksByStatus(user.getId(), TaskStatus.TODO);
    //     long inProgress = taskRepository.countUserAccessibleTasksByStatus(user.getId(), TaskStatus.IN_PROGRESS);
    //     long done = taskRepository.countUserAccessibleTasksByStatus(user.getId(), TaskStatus.DONE);
    //     long overdue = taskRepository.countOverdueTasksForUser(user.getId(), LocalDate.now());

    //     stats.put("totalTasks", total);
    //     stats.put("todo", todo);
    //     stats.put("inProgress", inProgress);
    //     stats.put("done", done);
    //     stats.put("overdue", overdue);

    //     return stats;
    // }

    

@Override
public Map<String, Object> getDashboardStats() {

    User user = (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    Map<String, Object> stats = new HashMap<>();

    long total = taskRepository.countUserAccessibleTasks(user.getId());
    long todo = taskRepository.countUserAccessibleTasksByStatus(user.getId(), TaskStatus.TODO);
    long inProgress = taskRepository.countUserAccessibleTasksByStatus(user.getId(), TaskStatus.IN_PROGRESS);
    long done = taskRepository.countUserAccessibleTasksByStatus(user.getId(), TaskStatus.DONE);
    long overdue = taskRepository.countOverdueTasksForUser(user.getId(), LocalDate.now());

    stats.put("totalTasks", total);
    stats.put("todo", todo);
    stats.put("inProgress", inProgress);
    stats.put("done", done);
    stats.put("overdue", overdue);

    return stats;
}
}

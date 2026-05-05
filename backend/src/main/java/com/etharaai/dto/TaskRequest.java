package com.etharaai.dto;
import lombok.Data;
import java.time.LocalDate;
import com.etharaai.model.TaskStatus;
import com.etharaai.model.TaskPriority;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate dueDate;
    private Integer assignedToId;
}

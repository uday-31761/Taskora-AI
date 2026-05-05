# Team Task Manager

A beautiful, full-stack real-world collaborative application where multiple users can manage tasks efficiently. Think of it as a simplified version of tools like Trello or Asana.

## Key Features

### 🔐 Unified Authentication
- Single login and signup page for both Admin and Members.
- JWT-based authentication for secure sessions.
- Clean, animated glassmorphism UI for authentication.

### 👥 Role-Based Access
- **Member (Default)**: Can view assigned projects, view tasks, create tasks, and update task statuses (To Do, In Progress, Done). IDs are 4 digits.
- **Admin**: Can create projects, add members via email, and have full view of all tasks in their projects. IDs are 2 digits.

### 📊 Interactive Dashboard
- Beautiful summary dashboard displaying total tasks, tasks in progress, completed tasks, and overdue tasks.
- Recharts integration providing visual pie charts and bar charts of task distributions.

### 📋 Project & Task Management (Kanban)
- Admins can create new projects and assign team members.
- Dynamic Kanban board interface for tasks inside projects.
- Drag-and-drop-style buttons to easily move tasks between "To Do", "In Progress", and "Done".

## Tech Stack

### Frontend (`/frontend`)
- **React.js** (built with Vite)
- **Tailwind CSS** (for styling and animations)
- **React Router** (for protected routing)
- **Axios** (for API calls with JWT interceptors)
- **Recharts** (for data visualization)
- **Lucide React** (for beautiful iconography)

### Backend (`/backend`)
- **Java Spring Boot 3.x**
- **Spring Security** & **jjwt** (for robust JWT authentication)
- **Spring Data JPA**
- **PostgreSQL Driver**

### Database
- **Supabase (PostgreSQL)**

## Project Structure Highlights
The backend strictly follows human-written conventions with interfaces and implementations:
- `com.etharaai.controller`
- `com.etharaai.dto`
- `com.etharaai.model`
- `com.etharaai.repository`
- `com.etharaai.service`
  - `com.etharaai.service.impl`

The frontend uses an organized Context API approach for authentication and componentized views for the UI.

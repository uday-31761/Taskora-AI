# Configuration & Setup Guide

This file outlines exactly what you need to change to run the Team Task Manager application on your local PC.

## 1. Database Credentials (Backend)

The backend is configured to connect to your Supabase PostgreSQL instance.

**File to modify:**
`backend/src/main/resources/application.properties`

**What to change:**
I have already pre-filled your provided credentials. However, if your password or URL changes, update these lines:
```properties
spring.datasource.url=jdbc:postgresql://db.bfcsgywgzxszzqdmrwmf.supabase.co:5432/postgres
spring.datasource.password=etharaaitaskmanager
```

## 2. JWT Secret (Backend)

**File to modify:**
`backend/src/main/resources/application.properties`

**What to change:**
I have generated a secure random 256-bit key for `jwt.secret`. You can leave this as is for local development, but it should be changed in a production environment.

## 3. API Base URL (Frontend)

**File to modify:**
`frontend/src/api/axiosConfig.js`

**What to change:**
The frontend expects the backend to run on `http://localhost:8080`.
```javascript
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Change this if your Spring Boot server runs on a different port
});
```

---

## How to Run the Application

### Running the Backend (Spring Boot)
1. Open a terminal in the `backend/` directory.
2. Run the application using the included Maven Wrapper:
   ```powershell
   .\mvnw spring-boot:run
   ```
   *(Note: The database tables will be automatically created in Supabase since `spring.jpa.hibernate.ddl-auto=update` is set).*

### Running the Frontend (React Vite)
1. Open a terminal in the `frontend/` directory.
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

### Creating an Admin
By default, anyone who signs up from the UI is given a `MEMBER` role.
To create your first `ADMIN`:
1. Sign up normally through the UI (e.g., `admin@example.com`).
2. Go to your Supabase SQL Editor and run:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
   ```
3. Log out and log back in. You will now see the "New Project" and "Add Member" buttons!

# student_management_system


## 📌 Features

### 🧑‍🎓 Student Management
- ➕ Add new student records
- 📋 View all students
- ✏️ Edit/update student information
- ❌ Delete student records
- 👤 View a sample student profile

### 📢 Announcement Management
- 📢 Post new announcements
- 📄 View all announcements (sorted by latest)
    

## 🛠️ Tech Stack

| **Category**            | **Technology**                  |
| ----------------------- | ------------------------------- |
| Frontend                | HTML5                           | 
|                         | CSS3                            |
|                         | JavaScript                      |
| Backend                 | Python                          | 
|                         | Flask                           | 
|                         | Flask-CORS                      | 
| Database                | MySQL                           | 

## 🗃️ Database Schema (MySQL)

### Table: `students`
| Column     | Type     |
|------------|----------|
| id         | INT      |
| name       | VARCHAR  |
| email      | VARCHAR  |
| phone      | VARCHAR  |
| dob        | DATE     |
| grades     | TEXT     |
| attendance | FLOAT    |
| fees       | FLOAT    |

### Table: `announcements`
| Column     | Type     |
|------------|----------|
| id         | INT      |
| title      | VARCHAR  |
| message    | TEXT     |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |






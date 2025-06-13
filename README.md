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

                  Page Load
                      │
                      ▼
         ┌────────────────────────┐
         │  window.onload         │
         │  calls fetchStudents() │
         └────────────────────────┘
                      │
                      ▼
     ┌────────────────────────────────────┐
     │ fetchStudents():                   │
     │ - Fetch student list from server   │
     │ - Clear old table content          │
     │ - Loop through students            │
     │ - Add each as a <tr> with data     │
     │ - Add Edit/Delete buttons          │
     └────────────────────────────────────┘
                      │
       ┌──────────────┴──────────────┐
       ▼                             ▼
┌────────────────┐         ┌────────────────────┐
│ Edit Button     │         │ Delete Button      │
│ onclick=startEdit(id) │   │ onclick=deleteStudent(id) │
└────────────────┘         └────────────────────┘
       │                             │
       ▼                             ▼
┌────────────────────────┐   ┌────────────────────────────┐
│ startEdit(id):         │   │ deleteStudent(id):         │
│ - Find table row       │   │ - Show confirm dialog      │
│ - Fill edit form       │   │ - Send DELETE to server    │
│ - Show form UI         │   │ - Refresh list             │
└────────────────────────┘   └────────────────────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ User edits data and clicks submit  │
│ → Triggers form submit event       │
└────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│ editStudentForm submit handler:             │
│ - Prevent default form action               │
│ - Collect edited data                       │
│ - Send PUT request to update on server      │
│ - Hide form                                 │
│ - Refresh student list (fetchStudents)      │
└─────────────────────────────────────────────┘



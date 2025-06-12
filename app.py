from flask import Flask, request, jsonify, send_from_directory
import mysql.connector
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static')
CORS(app)

# ✅ Serve add_student.html at root URL
@app.route('/')
def serve_add_student():
    return send_from_directory('.', 'main.html')

# ✅ Serve any other static file (HTML, CSS, JS, etc.)
@app.route('/<path:filename>')
def serve_any_file(filename):
    return send_from_directory('.', filename)

# ✅ Handle POST to /add_student
@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.get_json()
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',       # ← Change this
            password='root',   # ← Change this
            database='student_system'    # ← Change this
        )
        cursor = conn.cursor()
        query = """
            INSERT INTO students (name, email, phone, dob, grades, attendance, fees)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            data['name'],
            data['email'],
            data['phone'],
            data['dob'],
            data.get('grades'),
            data.get('attendance'),
            data.get('fees')
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Student added successfully'})
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500
    
@app.route('/create_announcement', methods=['POST'])
def create_announcement():
    data = request.get_json()
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root',
            database='student_system'
        )
        cursor = conn.cursor()
        query = """
            INSERT INTO announcements (title, message)
            VALUES (%s, %s)
        """
        cursor.execute(query, (data['title'], data['message']))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Announcement posted successfully'})
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500


# 🔹 Fetch all students
@app.route('/students', methods=['GET'])
def get_students():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root',
            database='student_system'
        )
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM students")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 🔹 Delete a student by ID
@app.route('/delete_student/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root',
            database='student_system'
        )
        cursor = conn.cursor()
        cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Student deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 🔹 Update a student by ID
@app.route('/update_student/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    data = request.get_json()
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root',
            database='student_system'
        )
        cursor = conn.cursor()
        query = """
            UPDATE students
            SET name=%s, email=%s, phone=%s, dob=%s, grades=%s, attendance=%s, fees=%s
            WHERE id=%s
        """
        cursor.execute(query, (
            data['name'], data['email'], data['phone'], data['dob'],
            data.get('grades'), data.get('attendance'), data.get('fees'),
            student_id
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Student updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/announcements', methods=['GET'])
def get_announcements():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root',
            database='student_system'
        )
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM announcements ORDER BY created_at DESC")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/student_profile', methods=['GET'])
def get_student_profile():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root',
            database='student_system'
        )
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM students ORDER BY id ASC LIMIT 1")
        student = cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify(student)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

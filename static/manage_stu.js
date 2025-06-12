async function fetchStudents() {
  const res = await fetch('/students');
  const students = await res.json();
  const table = document.getElementById('studentsTable');
  table.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${new Date(student.dob).toISOString().split('T')[0]}</td>
      <td>${student.grades || ''}</td>
      <td>${student.attendance || ''}</td>
      <td>${student.fees || ''}</td>
      <td>
        <button onclick="startEdit(${student.id})">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

async function deleteStudent(id) {
  const confirmDelete = confirm("Are you sure you want to delete this student?");
  if (!confirmDelete) return;

  await fetch(`/delete_student/${id}`, { method: 'DELETE' });
  fetchStudents();
}

function startEdit(id) {
  const rows = document.querySelectorAll('#studentsTable tr');
  const row = Array.from(rows).find(r => r.innerHTML.includes(`startEdit(${id})`));
  const cells = row.querySelectorAll('td');

  document.getElementById('editId').value = id;
  document.getElementById('editName').value = cells[0].textContent;
  document.getElementById('editEmail').value = cells[1].textContent;
  document.getElementById('editPhone').value = cells[2].textContent;
  document.getElementById('editDob').value = cells[3].textContent;
  document.getElementById('editGrades').value = cells[4].textContent;
  document.getElementById('editAttendance').value = cells[5].textContent;
  document.getElementById('editFees').value = cells[6].textContent;

  document.getElementById('editFormContainer').style.display = 'block';
}

function cancelEdit() {
  document.getElementById('editFormContainer').style.display = 'none';
}

document.getElementById('editStudentForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const id = document.getElementById('editId').value;
  const data = {
    name: document.getElementById('editName').value,
    email: document.getElementById('editEmail').value,
    phone: document.getElementById('editPhone').value,
    dob: document.getElementById('editDob').value,
    grades: document.getElementById('editGrades').value,
    attendance: document.getElementById('editAttendance').value,
    fees: document.getElementById('editFees').value
  };

  await fetch(`/update_student/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  cancelEdit();
  fetchStudents();
});

window.onload = fetchStudents;

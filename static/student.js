async function loadProfile() {
  const res = await fetch('/student_profile');
  const student = await res.json();
  const content = document.getElementById('content');

  if (student && student.name) {
    content.innerHTML = `
      <h2>My Profile</h2>
      <p><strong>Name:</strong> ${student.name}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Phone:</strong> ${student.phone}</p>
      <p><strong>DOB:</strong> ${new Date(student.dob).toISOString().split('T')[0]}</p>
      <p><strong>Grades:</strong> ${student.grades || '-'}</p>
      <p><strong>Attendance:</strong> ${student.attendance || '-'}%</p>
      <p><strong>Fees:</strong> ₹${student.fees || '0.00'}</p>
    `;
  } else {
    content.innerHTML = `<p>No student profile found.</p>`;
  }
}

async function loadAnnouncements() {
  const res = await fetch('/announcements');
  const list = await res.json();
  const content = document.getElementById('content');

  content.innerHTML = `<h2>Announcements</h2>`;

  if (list.length === 0) {
    content.innerHTML += `<p>No announcements yet.</p>`;
    return;
  }

  list.forEach(item => {
    content.innerHTML += `
      <div class="announcement-item">
        <h4>${item.title}</h4>
        <p>${item.message}</p>
        <small>${new Date(item.created_at).toLocaleString()}</small>
        <hr>
      </div>
    `;
  });
}

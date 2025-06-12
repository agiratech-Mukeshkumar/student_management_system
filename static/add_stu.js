const form = document.getElementById('studentForm');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const data = new FormData(form);
  const student = Object.fromEntries(data.entries());

  try {
    const response = await fetch('/add_student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });

    const result = await response.json();
    alert(result.message);
    form.reset();
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to add student.');
  }
});

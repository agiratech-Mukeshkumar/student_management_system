document.getElementById('announcementForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const data = new FormData(this);
  const announcement = Object.fromEntries(data.entries());

  try {
    const res = await fetch('/create_announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement)
    });

    const result = await res.json();
    alert(result.message);
    this.reset();
    fetchAnnouncements();
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to post announcement.');
  }
});

async function fetchAnnouncements() {
  const res = await fetch('/announcements');
  const announcements = await res.json();
  const container = document.getElementById('announcementList');
  container.innerHTML = '';

  announcements.forEach(a => {
    const item = document.createElement('div');
    item.className = 'announcement-item';
    item.innerHTML = `
      <h4>${a.title}</h4>
      <p>${a.message}</p>
      <small>${new Date(a.created_at).toLocaleString()}</small>
      <hr>
    `;
    container.appendChild(item);
  });
}

window.onload = fetchAnnouncements;

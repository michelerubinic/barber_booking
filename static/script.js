Interazione con il back-end tramite AJAX.
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const response = await fetch('/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service, date, time }),
  });
  const result = await response.json();
  const messageDiv = document.getElementById('responseMessage');
  if (result.success) {
    messageDiv.textContent = 'Appointment booked successfully!';
    messageDiv.style.color = 'green';
  } else {
    messageDiv.textContent = 'Error booking appointment. Please try again.';
    messageDiv.style.color = 'red';
  }
});

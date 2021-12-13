async function handleFormSubmit(event) {
  event.preventDefault();

  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.status === 201) {
    localStorage.setItem('token', data.session.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    window.location.href = '/habits';
  } else {
    alert(data.message);
  }
}

document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
const token = localStorage.getItem('token');
if (token) {
  window.location.href = '/habits';
}

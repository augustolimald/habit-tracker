async function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('inputName').value;
  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.status === 201) {
    alert('Cadastro realizado com sucesso!');
    window.location.href = '/login';
  } else {
    alert(data.message);
  }
}

document.getElementById('registerForm').addEventListener('submit', handleFormSubmit);

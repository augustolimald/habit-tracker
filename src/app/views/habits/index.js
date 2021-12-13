/**
 * Presentation Text
 */
const user = JSON.parse(localStorage.getItem('user'));
document.getElementById('presentationText').innerHTML = `Olá, ${user.name}`;

/**
 * Logout
 */
async function logout() {
  await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  localStorage.clear();
  window.location.href = '/login';
}

document.getElementById('exitButton').addEventListener('click', logout);

/**
 * Add Habit
 */
async function addHabit() {
  const name = prompt('Digite o nome do seu hábito');

  const response = await fetch('/api/habits', {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.status === 201) {
    alert('Hábito adicionado com sucesso!');
    window.location.reload();
  } else {
    alert('Algo deu errado');
  }
}

document.getElementById('addHabit').addEventListener('click', addHabit);

/**
 * Add Occurrence to Habit
 */
async function addOccurrenceToHabit(id) {
  const response = await fetch(`/api/habits/${id}/occurrences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.status === 201) {
    alert('Registrado com sucesso!');
  } else {
    alert('Algo deu errado');
  }
}

/**
 * Load Habits
 */
fetch('/api/habits', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error('Algo deu errado');
  })
  .then(habits => {
    const habitList = document.getElementById('habitList');

    if (habits.length === 0) {
      habitList.innerHTML = `<h4>Nenhum Hábito</h4><br>`;
    }

    habits.forEach(habit => {
      const habitElement = document.createElement('li');
      habitElement.className = 'card habitItem';

      const habitText = document.createElement('p');
      habitText.innerHTML = habit.name;

      const btnContainer = document.createElement('div');
      const btnView = document.createElement('button');
      btnView.style = 'background-color: #ffff; color: white; padding: 5px; border-radius: 5px;';
      btnView.onclick = () => {
        window.location.href = `/habit?id=${habit.id}`;
      };
      btnContainer.appendChild(btnView);

      const btnAdd = document.createElement('button');
      btnAdd.style = 'background-color: #4CAF50; color: white; padding: 5px; border-radius: 5px;';
      btnAdd.onclick = () => {
        if (confirm('Deseja registrar a ocorrência?')) {
          addOccurrenceToHabit(habit.id);
        }
      };
      btnContainer.appendChild(btnAdd);

      habitElement.appendChild(habitText);
      habitElement.appendChild(btnContainer);
      habitList.appendChild(habitElement);
    });
  })
  .catch(error => {
    alert(error);
    localStorage.clear();
    window.location.href = '/login';
  });

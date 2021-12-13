const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const idHabit = params.id;

if (!idHabit) {
  window.location.href = '/habits';
}

/**
 * Remove Habit
 */
async function removeHabit() {
  if (!confirm('Tem certeza que deseja excluir?')) {
    return;
  }

  const response = await fetch(`/api/habits/${idHabit}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.status === 204) {
    alert('Deletado com sucesso!');
    window.location.href = '/habits';
  } else {
    alert('Algo deu errado');
  }
}

document.getElementById('btnRemoveHabit').addEventListener('click', removeHabit);

/**
 * Add Occurrence to Habit
 */
async function addOccurrenceToHabit() {
  if (!confirm('Adicionar nova ocorrência?')) {
    return;
  }

  const response = await fetch(`/api/habits/${idHabit}/occurrences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.status === 201) {
    alert('Registrado com sucesso!');
    window.location.reload();
  } else {
    alert('Algo deu errado');
  }
}

document.getElementById('btnAddOccurrence').addEventListener('click', addOccurrenceToHabit);

/**
 * Remove Occurrence from Habit
 */
async function removeOccurrenceFromHabit(idOccurrence) {
  const response = await fetch(`/api/habits/${idHabit}/occurrences/${idOccurrence}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.status === 204) {
    alert('Deletado com sucesso!');
    window.location.reload();
  } else {
    alert('Algo deu errado');
  }
}

/**
 * Load Habits
 */
fetch(`/api/habits/${idHabit}/occurrences?page=1&amount=1000`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then(occurrences => {
    const occurrencesList = document.getElementById('occurrencesList');

    if (occurrences.length === 0) {
      occurrencesList.innerHTML = `<h3>Nenhuma ocorrência</h3>`;
    }

    occurrences.forEach(occurrence => {
      const occurrenceElement = document.createElement('li');
      occurrenceElement.className = 'card occurrenceItem';

      const occurrenceText = document.createElement('p');
      occurrenceText.innerHTML = new Date(occurrence.date).toLocaleString('pt-BR');

      const btnRemove = document.createElement('button');
      btnRemove.style = 'background-color: red; color: white; padding: 5px; border-radius: 5px;';
      btnRemove.onclick = () => {
        if (confirm('Deseja cancelar a ocorrência?')) {
          removeOccurrenceFromHabit(occurrence.id);
        }
      };

      occurrenceElement.appendChild(occurrenceText);
      occurrenceElement.appendChild(btnRemove);
      occurrencesList.appendChild(occurrenceElement);
    });
  });

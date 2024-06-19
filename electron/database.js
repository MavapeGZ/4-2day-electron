document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    let name = document.getElementById("name").value;
    let type = document.querySelector('input[name="type"]:checked');
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;

    // Limpiar mensajes de error anteriores
    document.getElementById("error-name").style.display = 'none';
    document.getElementById("error-type").style.display = 'none';
    document.getElementById("error-date").style.display = 'none';
    document.getElementById("error-description").style.display = 'none';

    let hasError = false;

    // Validar campos
    if (name === '') {
        document.getElementById("error-name").innerText = "Please, complete the 'name' field";
        document.getElementById("error-name").style.display = 'block';
        hasError = true;
    }
    if (!type) {
        document.getElementById("error-type").innerText = "Please, complete the 'type' field";
        document.getElementById("error-type").style.display = 'block';
        hasError = true;
    }
    if (date === '') {
        document.getElementById("error-date").innerText = "Please, complete the 'date' field";
        document.getElementById("error-date").style.display = 'block';
        hasError = true;
    }
    if (description === '') {
        document.getElementById("error-description").innerText = "Please, complete the 'description' field";
        document.getElementById("error-description").style.display = 'block';
        hasError = true;
    }

    if (hasError) {
        return false;
    }

    let task = {
        name: name,
        type: type.value,
        date: date,
        description: description
    };

    // Llamar a la función expuesta para agregar la tarea
    window.electron.addTask(task);

    // Limpiar el formulario después de guardar la tarea
    document.getElementById('task-form').reset();
});

// Añadir event listeners para ocultar mensajes de error cuando se introduce un valor
document.getElementById('name').addEventListener('input', () => {
    document.getElementById('error-name').style.display = 'none';
});

document.querySelectorAll('input[name="type"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        document.getElementById('error-type').style.display = 'none';
    });
});

document.getElementById('date').addEventListener('input', () => {
    document.getElementById('error-date').style.display = 'none';
});

document.getElementById('description').addEventListener('input', () => {
    document.getElementById('error-description').style.display = 'none';
});

// Function to update table with tasks
const updateTable = async () => {
    const tasks = await window.electron.getTasks();
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = ''; // Clear existing table rows

    // Sort tasks by date (ascending order)
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    const currentDate = new Date().toISOString().split('T')[0];

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="name">${task.name}</td>
            <td><img src="./images/${task.type}.png" alt="${task.type}"></td>
            <td>${task.date}</td>
            <td class="description">${task.description}</td>
            <td><img src="./images/delete.png" alt="delete" class="delete-icon" data-id="${task._id}"></td>
        `;

        // Apply a class if the task date is past
        if (task.date < currentDate) {
            row.classList.add('past-due');
        }

        taskList.appendChild(row);
    });

    // Add event listeners to delete images
    document.querySelectorAll('.delete-icon').forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const taskId = event.target.getAttribute('data-id');
            await window.electron.deleteTask(taskId);
            updateTable(); // Refresh the table after deletion
        });
    });
};

// Call updateTable initially to load existing tasks
updateTable();

// Listen for 'task-added' event to update table when a new task is added
window.electron.onTaskAdded((result) => {
    if (result.success) {
        console.log(result.message);
        updateTable(); // Update table with new data
    } else {
        console.error(result.message);
    }
});

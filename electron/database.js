// Escuchar el evento 'submit' del formulario
document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    let name = document.getElementById("name").value;
    let type = document.querySelector('input[name="type"]:checked').value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;

    let task = {
        name: name,
        type: type,
        date: date,
        description: description
    };

    // Validar que todos los campos estén llenos
    if (name === '' || type === '' || date === '' || description === '') {
        console.log("Please fill in all fields");
        return false;
    } else {
        // Llamar a la función expuesta para agregar la tarea
        window.electron.addTask(task);

        // Limpiar el formulario después de guardar la tarea
        document.getElementById('task-form').reset();
    }
});

 // Assuming this script is loaded after contextBridge setup

// Function to update table with tasks
const updateTable = async () => {
    const tasks = await window.electron.getTasks();
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = ''; // Clear existing table rows

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td><img src="./icons/${task.type}.png" alt="${task.type}"></td>
            <td>${task.date}</td>
            <td class="description">${task.description}</td>
            <td><img src="./icons/delete.png" alt="delete" class="delete-icon" data-id="${task._id}"></td>
        `;
        taskList.appendChild(row);
    });

    // Add event listeners to delete icons
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

document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault();

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

    if (name === '' || type === '' || date === '' || description === '') {
        console.log("Please fill in all fields");
        return false;
    } else {
        window.electron.addTask(task);
    }
});

window.electron.onTaskAdded((message) => {
    console.log(message);
    // Aquí puedes agregar el código para actualizar la interfaz de usuario si es necesario
});

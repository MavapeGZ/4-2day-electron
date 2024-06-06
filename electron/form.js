class form {
    static async CreateForm_ADD() {
        DOM_class.OpenFormDiv();
        this.UpdateForm();
    }

    static SubmitForm() {
        let typeInput = document.querySelector('input[name="type"]:checked');
        let type = typeInput ? typeInput.value : null;
        let typeImageSrc = typeInput ? typeInput.nextElementSibling.src : null;
        let date = document.getElementById('date').value;
        let name = document.getElementById('name').value;
        let comments = document.getElementById('comments').value;

        if (!type) {
            document.getElementById('error_type').innerText = 'Please select a type';
            return;
        } else {
            document.getElementById('error_type').innerText = '';
        }

        if (!date) {
            document.getElementById('error_date').innerText = 'Please select a date';
            return;
        } else {
            document.getElementById('error_date').innerText = '';
        }

        if (!name) {
            document.getElementById('error_name').innerText = 'Please enter a name';
            return;
        } else {
            document.getElementById('error_name').innerText = '';
        }

        if (!comments) {
            document.getElementById('error_comments').innerText = 'Please enter comments';
            return;
        } else {
            document.getElementById('error_comments').innerText = '';
        }

        DOM_class.CloseFormDiv();
        form.AddDataToTable(typeImageSrc, date, name, comments);
    }

    static async UpdateForm() {
        document.getElementById("GEN_form").innerHTML = '';

        document.getElementById("GEN_form").innerHTML = `
        <form id="GEN_form" name="GEN_form" class="form">
            <label for="label_type" id="label_type" class="type">Type:</label>
            <br><br>
            <div id="type_radio_container">
                ${this.createRadioButton('family', './icons/family.png')}
                ${this.createRadioButton('basket', './icons/basket.png')}
                ${this.createRadioButton('studies', './icons/studies.png')}
                ${this.createRadioButton('birthday', './icons/birthday.png')}
                ${this.createRadioButton('broom', './icons/broom.png')}
                ${this.createRadioButton('points', './icons/points.png')}
            </div>
            <div id="div_error_type" class="error_attr"><a id="error_type"></a></div>
            <br><br>
            <label for="label_date" id="label_date" class="date">Date:</label>
            <br><br>
            <input type="date" id="date" name="date">
            <div id="div_error_date" class="error_attr"><a id="error_date"></a></div>
            <br><br>
            <label for="label_name" id="label_name" class="name">Name:</label>
            <br><br>
            <input type="text" id="name" name="name" class="name_input">
            <div id="div_error_name" class="error_attr"><a id="error_name"></a></div>
            <br><br>
            <label for="label_comments" id="label_comments" class="comments">Comments:</label>
            <br><br>
            <textarea id="comments" name="comments" class="textarea_input"></textarea>
            <div id="div_error_comments" class="error_attr"><a id="error_comments"></a></div>
        `;

        document.getElementById("submit_button").addEventListener("click", form.SubmitForm);
    }

    static createRadioButton(id, imgSrc) {
        return `
            <label class="radio_label" for="radio_${id}">
                <input type="radio" id="radio_${id}" name="type" class="radio_input" value="${id}">
                <img src="${imgSrc}" class="radio_image">
            </label>
        `;
    }

    static AddDataToTable(typeImageSrc, date, name, comments) {
        const table = document.getElementById('id_data_table');

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskExists = tasks.some(task => task.date === date && task.name === name && task.comments === comments);

        if (!taskExists) {
            const newRow = document.createElement('div');
            newRow.className = 'data_row';

            newRow.innerHTML = `
                <div class="data_cell"><img src="${typeImageSrc}" class="table_image"></div>
                <div class="data_cell">${date}</div>
                <div class="data_cell">${name}</div>
                <div class="data_cell">${comments}</div>
                <div class="data_cell"><img src="./icons/delete.png" class="delete_button" onclick="form.DeleteTask(this)"></div>
            `;

            table.appendChild(newRow);

            tasks.push({ typeImageSrc, date, name, comments });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    static DeleteTask(button) {
        const row = button.closest('.data_row');
        const cells = row.querySelectorAll('.data_cell');
        const date = cells[1].innerText;
        const name = cells[2].innerText;
        const comments = cells[3].innerText;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const filteredTasks = tasks.filter(task => !(task.date === date && task.name === name && task.comments === comments));

        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        row.remove();
    }

    static LoadDataFromStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            this.AddDataToTable(task.typeImageSrc, task.date, task.name, task.comments);
        });
    }
}

module.exports = form;
form.LoadDataFromStorage();

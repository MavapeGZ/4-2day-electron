class form {

    static async CreateForm_ADD() {
        DOM_class.OpenFormDiv();
        // Resetear el formulario
        this.UpdateForm();
    }

    static SubmitForm(event) {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
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
                ${this.createRadioButton('birthay', './icons/birthay.png')}
                ${this.createRadioButton('broom', './icons/broom.png')}
                ${this.createRadioButton('points', './icons/points.png')}
            </div>
            <div id="div_error_type" class="error_attr"><a id="error_type"></a></div>
            <br><br>

            <label for="label_date" id="label_date" class="date">Date:</label>
            <input type="text" id="date" name="date">
            <div id="div_error_date" class="error_attr"><a id="error_date"></a></div>
            <br><br>

            <label for="label_name" id="label_name" class="name">Name:</label>
            <input type="text" id="name" name="name">
            <div id="div_error_name" class="error_attr"><a id="error_name"></a></div>
            <br><br>

            <label for="label_comments" id="label_comments" class="comments">Comments:</label>
            <input type="text" id="comments" name="comments">
            <div id="div_error_comments" class="error_attr"><a id="error_comments"></a></div>
            <br><br>
        </form>`;
    }

    static createRadioButton(value, imageSrc) {
        return `
        <label class="radio_label">
            <input type="radio" name="type" value="${value}" class="radio_input">
            <img src="${imageSrc}" alt="${value}" class="radio_image">
        </label>`;
    }
}

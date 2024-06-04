class form {

    static async CreateForm_ADD() {

        //resetear el formulario
        this.UpdateForm();
    }

    static UpdateForm() {

        document.getElementById("GEN_form").innerHTML = '';

        document.getElementById("GEN_form").innerHTML = `
        <form id="GEN_form" name="GEN_form" class="form"> 

        <label for="label_type" id="label_type" class="type">Type:</label>
        <input type="text" id="type" name="type">
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

        `;

        // form attributes
        // let attr = document.forms['GEN_form'].elements;
        // for (let i = 0; i < attr.length; i++) {
        //     if (eval(document.getElementById('div_error_' + attr[i].id))) {
        //         document.getElementById('div_error_' + attr[i].id).style.display = 'none';
        //     }
        // }

    }
}
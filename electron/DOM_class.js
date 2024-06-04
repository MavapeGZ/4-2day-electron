// DOM_class.js
class DOM_class {

    static Initialize() {
        DOM_class.CloseFormDiv();
    }

    static CloseFormDiv() {
        document.getElementById('div_GEN_form').style.display = 'none';
        document.getElementById('GEN_form').style.display = 'none';
    }

    static OpenFormDiv() {
        document.getElementById('div_GEN_form').style.display = 'block';
        document.getElementById('GEN_form').style.display = 'block';
    }
}

module.exports = DOM_class;

class DOM_class {
    static Initialize() {
        DOM_class.CloseFormDiv();
    }

    static OpenFormDiv() {
        document.getElementById('div_GEN_form').style.display = 'block';
        document.getElementById('GEN_form').style.display = 'block';
    }

    static CloseFormDiv() {
        document.getElementById('div_GEN_form').style.display = 'none';
        document.getElementById('GEN_form').style.display = 'none';
    }
}

module.exports = DOM_class;

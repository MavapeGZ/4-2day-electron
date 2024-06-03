class DOM_class {

    static initialize() {
        DOM_class.CloseFormDiv();
    }

    static CloseFormDiv(){
        document.getElementById('div_GEN_form').style.display = 'none';
        document.getElementById('GEN_form').style.display = 'none';
    }
}
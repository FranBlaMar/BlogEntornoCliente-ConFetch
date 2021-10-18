let formulario = document.getElementsByClassName("formulario")[0];
let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let fecha = document.getElementById("fecha");
let dni = document.getElementById("dni");


let validar = {
    nombre: false,
    email: false,
    fecha: false,
    dni: false
}

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    validarFormulario();
})

nombre.addEventListener("change",(e)=>{
    let dato = e.target.value.trim();
    let expresion = /.[0-9]/
    if (dato.length < 1 || expresion.test(dato)){
        validar.nombre = false;
    }
    else{
        validar.nombre = true;
    }
})

email.addEventListener("change",(e)=>{
    let dato = e.target.value.trim();
    let expresion = /.+@[a-z]+\.[a-z]{3}/;
    if (dato.length > 12 && expresion.test(dato)){
        validar.email = true;
    }
    else{
        validar.email = false;
    }
})

fecha.addEventListener("change",(e)=>{
    let dato = new Date(e.target.value).getFullYear();
    if (dato < 1920){
        validar.fecha = false;
    }
    else{
        validar.fecha = true;
    }
})

dni.addEventListener("change", (e) => {
    let dato = e.target.value.trim();
    let expresion = /^[1-9][0-9]{7}[A-Z]$/;
    if (dato.length == 9 || expresion.test(dato)){
        validar.dni = true;
    }
    else{
        validar.dni = false;
    }
})

function validarFormulario (){
    let datos = Object.values(validar);
    let valido = datos.findIndex(valor => valor == false);
    if (valido == -1) {
        formulario.submit();
    }
    else{
        alert("Formulario no valido\nCompruebe los datos");
    }
}
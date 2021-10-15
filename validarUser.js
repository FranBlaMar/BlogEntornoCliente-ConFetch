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
    let expresion = /^[0-9]$/
    if (dato.length < 1 || ){
        
    }
})
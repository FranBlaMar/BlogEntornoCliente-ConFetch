let botonComent = document.getElementById("añadirComent");
botonComent.addEventListener("click",añadirComentario);


let peticion = new XMLHttpRequest();
let id = window.location.search;

peticion.open("GET", `http://localhost:3000/posts/${id}`);
peticion.send();
//añadimos evento a la peticion
peticion.addEventListener("load",function(){
    if(peticion.status == 200){
        //Guardamos el array con todos los posts
        let datos = JSON.parse(peticion.responseText);
        let cuerpo=document.getElementById("cuerpo");
        let textoNode = document.createTextNode(datos[0].cuerpo);
        cuerpo.appendChild(textoNode);
        let titulo=document.getElementById("titulo");
        let textoNode2 = document.createTextNode(datos[0].title);
        titulo.appendChild(textoNode2);
    }
})

let formulario = document.getElementById("formComent");
let peticion1 = new XMLHttpRequest();
peticion1.open("GET", `http://localhost:3000/users`);
peticion1.send();
//añadimos evento a la peticion
peticion1.addEventListener("load",function(){
    if(peticion1.status == 200){
        let usuarios = JSON.parse(peticion1.responseText);
        usuarios.forEach(dato=>{
            let select = document.getElementById("users");
            let option = document.createElement("option");
            option.value = dato.nombre.toUpperCase();
            option.innerHTML=`${dato.nombre.toUpperCase()}`;
            select.appendChild(option);
        });
    }
})

let seccionComentarios = document.getElementById("comentariosDeUsuarios");
let peticion2 = new XMLHttpRequest();
peticion2.open("GET", `http://localhost:3000/comments`);
peticion2.send();
//añadimos evento a la peticion
peticion2.addEventListener("load",function(){
    if(peticion2.status == 200){
        //Guardamos el array con todos los posts
        let datosComents = JSON.parse(peticion2.responseText);
        datosComents.forEach(dato => {
            if (`?id=${dato.idPost}` == id){
                let autor = document.createElement("p");
                autor.className = "AutorComent";
                let textoAutor = document.createTextNode(dato.usuario);
                autor.appendChild(textoAutor);
                seccionComentarios.appendChild(autor);


                let cuerpo = document.createElement("p");
                cuerpo.className = "CuerpoComent";
                let textoComent = document.createTextNode(dato.cuerpo);
                cuerpo.appendChild(textoComent);
                seccionComentarios.appendChild(cuerpo);

                let fecha = document.createElement("p");
                fecha.className = "fechaComent";
                let fechaComent = document.createTextNode(dato.fecha);
                fecha.appendChild(fechaComent);
                seccionComentarios.appendChild(fecha);
            }
        }); 
    }
})

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    añadirComentario();
})

let idP = (new URLSearchParams(window.location.search)).get("id");
function añadirComentario(){
    const datosComent={
        usuario: document.getElementById("users").value,
        cuerpo: document.getElementById("TextoComentario").value,
        fecha: (new Date (Date.now())).toDateString(),
        idPost: idP,
    }
    let peticion = new XMLHttpRequest();
    peticion.open("POST", `http://localhost:3000/comments`);
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send(JSON.stringify(datosComent));
    formulario.reload();
}

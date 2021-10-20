let peticion = new XMLHttpRequest();
peticion.open("GET", "http://localhost:3000/posts");
peticion.send();
//añadimos evento a la peticion
peticion.addEventListener("readystatechange",function(){
    if(peticion.readyState == 4){
        if(peticion.status == 200){
            //Guardamos el array con todos los posts
            let datos = JSON.parse(peticion.responseText);
            for (let i = 0; i < datos.length;i++){
                /*Creacion de cada celda de la tabla. Se usa un bucle for para crear tantas celdas como datos
                nos haya devuelto la peticion GET.
                Se crea un tr donde añadimos el restos de tds con los datos del autor, titulo y los botones de borrar y ver*/
                
                //Bloque de creacion de tr,td y textnodes
                //---------------------------------------------------------//
                let tr = document.createElement("tr");
                let titulo = document.createElement("td");
                let autor = document.createElement("td");
                let acciones = document.createElement("td");
                let textotitulo = document.createTextNode(datos[i].title);
                titulo.appendChild(textotitulo);
                let textoautor = document.createTextNode(datos[i].author);
                autor.appendChild(textoautor);
                let botonBorrar = document.createElement("button");
                let botonBorrarText=document.createTextNode("Borrar");
                botonBorrar.appendChild(botonBorrarText);
                acciones.appendChild(botonBorrar);
                botonBorrar.id = datos[i].id;
                //añadimos evento click al boton de borrar y de ver más
                botonBorrar.addEventListener("click",borrarPost);
                let botonVer = document.createElement("button");
                let botonVerText=document.createTextNode("Ver más");
                botonVer.appendChild(botonVerText);
                acciones.appendChild(botonVer);
                botonVer.addEventListener("click",function(){
                    location.href=`ver.html?id=${datos[i].id}`;
                });
                //------------------------------------------------------//
                tr.appendChild(autor);
                tr.appendChild(titulo);
                tr.appendChild(acciones);

                //Añadimos finalmente el TR a la tabla
                document.getElementById("tabla").appendChild(tr);
                //Esto se repite tantas veces como datos devuelva la peticion GET
            }
        }
    }
})

//Cómo obtener los parámetros de la URL usando JavaScript.
function borrarPost (e){
    let id = e.target.id;
    let peticionBorrar = new XMLHttpRequest();
    peticionBorrar.open("DELETE", `http://localhost:3000/posts/${id}`);
    peticionBorrar.send();
    //añadimos evento a la peticion
    peticionBorrar.addEventListener("readystatechange",function(){
        if(peticionBorrar.readyState == 4){
            if(peticionBorrar.status == 200){
                alert("Post Borrado :(");
                let tabla = document.getElementById("tabla");
                let tr = document.getElementsByTagName("tr")[posicion];
                tabla.removeChild(tr);
            }
        }
    })
}


let peticion1 = new XMLHttpRequest();
peticion1.open("GET", `http://localhost:3000/users`);
peticion1.send();
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

let botonPost = document.getElementById("añadirPost");
botonPost.addEventListener("click",añadirPost);
let formulario = document.getElementById("formPost");
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    añadirPost();
})

function añadirPost(){
    const datosPost={
        title: document.getElementById("TituloPost").value,
        author: document.getElementById("users").value,
        cuerpo: document.getElementById("CuerpoPost").value,
    }
    let peticion = new XMLHttpRequest();
    peticion.open("POST", `http://localhost:3000/posts`);
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send(JSON.stringify(datosPost));
    formulario.reload();
}
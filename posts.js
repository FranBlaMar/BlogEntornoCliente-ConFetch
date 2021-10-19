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
                tr.appendChild(titulo);
                tr.appendChild(autor);
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
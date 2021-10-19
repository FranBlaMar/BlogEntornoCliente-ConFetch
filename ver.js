let peticion = new XMLHttpRequest();
let id = window.location.search;
peticion.open("GET", `http://localhost:3000/posts/${id}`);
peticion.send();
//añadimos evento a la peticion
peticion.addEventListener("readystatechange",function(){
    if(peticion.readyState == 4){
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
    }
})

let peticion1 = new XMLHttpRequest();
let id = window.location.search;
peticion1.open("GET", `http://localhost:3000/users`);
peticion1.send();
//añadimos evento a la peticion
peticion1.addEventListener("readystatechange",function(){
    if(peticion1.readyState == 4){
        if(peticion1.status == 200){
           
        }
    }
})

let seccionComentaios = document.getElementById("comentarios");
let peticion2 = new XMLHttpRequest();
peticion2.open("GET", `http://localhost:3000/comments`);
peticion2.send();
//añadimos evento a la peticion
peticion2.addEventListener("readystatechange",function(){
    if(peticion2.readyState == 4){
        if(peticion2.status == 200){
            //Guardamos el array con todos los posts
            let datos = JSON.parse(peticion.responseText);
            datos.forEach(dato => {
                if (dato.idPost == id){
                    let texto = document.createTextNode(dato);
                    seccionComentaios.appendChild(texto);
                }
            }); 
        }
    }
})



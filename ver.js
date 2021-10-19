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
            console.log(datos[0]);
            let cuerpo=document.getElementById("cuerpo");
            let texto = document.createElement("p");
            let textoNode = document.createTextNode(datos[0].cuerpo);
            texto.appendChild(textoNode);
            cuerpo.appendChild(texto);
        }
    }
})
const estadoServer = document.getElementById("estadoServer");

async function conectarServidor(){
    try{
        const respuesta = await fetch("http://127.0.0.1:8000");
        if(respuesta.ok){
            estadoServer.classList.remove("errorTexto");
            const datos = await respuesta.json()
            estadoServer.innerText = datos["message"];
        }
        
    }catch (error){
        estadoServer.classList.add("errorTexto");
        estadoServer.innerText = "No hay conexión";
    }
};

conectarServidor();
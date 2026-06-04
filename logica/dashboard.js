const btnSalir = document.getElementById("btnSalir");
const btnVerUsuarios = document.getElementById("btnVerUsuarios");

const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const respuestaServidor = document.getElementById("respuestaServidor");

const nombreUsuario = document.getElementById("nombreUsuario");
const tipoUsuario = document.getElementById("tipoUsuario");

const contenidoTabla = document.getElementById("contenidoTabla");

//---------------------------Salir de la app---------------------------------------
btnSalir.addEventListener("click", async ()=>{
    try{
        //const respuesta = await fetch("https://control-usuario-backend-inicio.onrender.com/logout"
        const respuesta = await fetch("http://127.0.0.1:8000/logout",{
            method: "POST",
            credentials: "include" //enviar cookie HttpOnly
        });
        
        if(respuesta.ok){
            const datos = await respuesta.json();
            
            respuestaServidor.classList.remove("errorTexto");
            tituloModal.innerHTML = "Información";
            respuestaServidor.innerText = datos.message;

            modal.showModal();
            setTimeout(()=>{
                sessionStorage.clear();
                window.location.replace("index.html"); //evitar volver atrás con el navegador
            }, 2500);
        }else{
            respuestaServidor.classList.add("errorTexto");
            tituloModal.innerHTML = "Error";
            respuestaServidor.innerText = "No se puede finalizar sesión";

            modal.showModal();
            setTimeout(()=>{
                modal.close();
            }, 2000);
        }

    }catch(error){
        respuestaServidor.classList.add("errorTexto");
        respuestaServidor.innerText = "No hay conexión con el servidor";
    }
});

//--------------------Cargar datos del usuario utilizando Cookie HttpOnly--------------------
async function cargarPerfil() {
    try{
        //const respuesta = await fetch("https://control-usuario-backend-inicio.onrender.com/usuarios/me"
        const respuesta = await fetch("http://127.0.0.1:8000/usuarios/me",
            {
                method: "GET",
                credentials: "include" //permite usar la cookie HttpOnly
            }
        );

        if(respuesta.ok){
            const datos = await respuesta.json();
            nombreUsuario.innerText = `Bienvenido: ${datos.username}`;
            tipoUsuario.innerText = `Su tipo de usuario es: ${datos.type}`;
        }else{
            respuestaServidor.classList.add("errorTexto");
            tituloModal.innerHTML = "Error";
            respuestaServidor.innerText = "No autenticado";
            //redirigir si el servidor no responde 200
            modal.showModal();
            setTimeout(()=>{
                window.location.replace("index.html");
            }, 2000);

        }
    }catch (error){
       alert("Error de conexión");
       window.location.replace("index.html");
    }
}

//--------------------ver usuarios utilizando Cookie HttpOnly--------------------
btnVerUsuarios.addEventListener("click", async () => {
    try{
        //const respuesta = await fetch("https://control-usuario-backend-inicio.onrender.com/usuarios"
        const respuesta = await fetch("http://127.0.0.1:8000/usuarios",
            {
                method: "GET",
                credentials: "include" //permite usar la cookie HttpOnly
            }
        );

        if(respuesta.ok){
            contenidoTabla.innerHTML = "";

            const datos = await respuesta.json();
            console.log(datos);
            
            const tabla = document.createElement("table");
            const titulosTabla = document.createElement("tr");
            const tituloUsernameTabla = document.createElement("th");
            const tituloTypeTabla = document.createElement("th");
            
            tituloUsernameTabla.innerText = "Nombre de usuario";
            tituloTypeTabla.innerText = "tipo de usuario";
            titulosTabla.append(tituloUsernameTabla);
            titulosTabla.append(tituloTypeTabla);
            tabla.append(titulosTabla);
            
            for(let i = 0; i< datos.length; i++){
                const filaTabla = document.createElement("tr");
                const columna1Tabla = document.createElement("td");
                const columna2Tabla = document.createElement("td");
                columna1Tabla.innerText = datos[i].username;
                columna2Tabla.innerText = datos[i].type;
                filaTabla.append(columna1Tabla);
                filaTabla.append(columna2Tabla);
                tabla.append(filaTabla);
            }

            contenidoTabla.append(tabla);
        }else{
            respuestaServidor.classList.add("errorTexto");
            tituloModal.innerHTML = "Error";
            respuestaServidor.innerText = "No autenticado";
            //redirigir si el servidor no responde 200
            modal.showModal();
            setTimeout(()=>{
                window.location.replace("index.html");
            }, 2000);
        }
    }catch(error){
       alert("Error de conexión");
       window.location.replace("index.html");
    }
})

//--------------------------------------------------------------------
cargarPerfil();
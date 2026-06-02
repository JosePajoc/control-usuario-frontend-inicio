const btnSalir = document.getElementById("btnSalir");

const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const respuestaServidor = document.getElementById("respuestaServidor");

const nombreUsuario = document.getElementById("nombreUsuario");
const tipoUsuario = document.getElementById("tipoUsuario");

btnSalir.addEventListener("click", async ()=>{
    try{
        const respuesta = await fetch("http://127.0.0.1:8000/logout",{
            method: "POST",
            credentials: "include" //enviar cookie HttpOnly
        });
        
        if(respuesta.ok){
            const datos = await respuesta.json();
            
            respuestaServidor.classList.remove("errorTexto");
            tituloModal.innerHTML = "Información";
            respuestaServidor.innerText = datos.message;
        }else{
            respuestaServidor.classList.add("errorTexto");
            tituloModal.innerHTML = "Error";
            respuestaServidor.innerText = "No se pudo finalizar sesión";
        }

        modal.showModal();
        setTimeout(()=>{
            window.location.href = "index.html";
        }, 2500);

    }catch(error){
        respuestaServidor.classList.add("errorTexto");
        respuestaServidor.innerText = "No hay conexión con el servidor";
    }
});

async function cargarPerfil() {
    try{
        const respuesta = await fetch("http://127.0.0.1:8000/usuarios/me",
            {
                method: "GET",
                credentials: "include" //permite usar la cookie HttpOnly
            }
        );

        if(respuesta.ok){
            const datos = await respuesta.json();
            nombreUsuario.innerText = `Usuario: ${datos.username}`;
            tipoUsuario.innerText = `Usuario: ${datos.type}`;
        }else{
            respuestaServidor.classList.add("errorTexto");
            tituloModal.innerHTML = "Error";
            respuestaServidor.innerText = "No autenticado";
            //redirigir si el servidor no responde 200
            modal.showModal();
            setTimeout(()=>{
                window.location.href = "index.html";
            }, 3000);

        }
    }catch (error){
       alert("Error de conexión");
    }
}

cargarPerfil();
const formularioLogin = document.getElementById("formularioLogin");
const username = document.getElementById("txtUsuario");
const password = document.getElementById("txtContrasena");

const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const respuestaServidor = document.getElementById("respuestaServidor");

formularioLogin.addEventListener("submit", async (evento) =>{
    evento.preventDefault();
    const usuario = {
        "username": username.value,
        "password": password.value
    }
    const respuesta = await iniciarSesion(usuario);
})

async function iniciarSesion(usuario) {
    try{
        const parametros = new URLSearchParams();   //objeto para crear pares de clave-valor
        parametros.append("username", usuario.username);
        parametros.append("password", usuario.password);
        //Tipo de contenido: clave-valor
        //const respuesta = await fetch("http://127.0.0.1:8000/token",
        const respuesta = await fetch("https://control-usuario-backend-inicio.onrender.com/token", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},  
            body: parametros,
            credentials: "include" //enviar y almacendar cookies automaticamente
        });
        
        if(respuesta.ok){
            const datos = await respuesta.json();
            respuestaServidor.classList.remove("errorTexto");
            
            tituloModal.innerHTML = "Bienvenido - Cargando Dashboard";
            respuestaServidor.innerText = datos.message;

            modal.showModal();
            setTimeout(()=>{
                // modal.close();
                window.location.href = "dashboard.html";
            }, 2500);

        }else{
            respuestaServidor.classList.add("errorTexto");
            tituloModal.innerHTML = "Error";
            respuestaServidor.innerText = "Credenciales incorrectas";
            
            modal.showModal();
            setTimeout(()=>{
                modal.close();
            }, 2000);
        }

    }catch (error){
        respuestaServidor.classList.add("errorTexto");
        respuestaServidor.innerText = "No hay conexión";
    }
}
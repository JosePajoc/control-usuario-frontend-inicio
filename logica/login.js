const formularioLogin = document.getElementById("formularioLogin");
const username = document.getElementById("txtUsuario");
const password = document.getElementById("txtContrasena");
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

        //cambia el tipo de envio
        //Ya no es "application/json" ahora pasa a clave-valor
        const respuesta = await fetch("http://127.0.0.1:8000/token", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},  
            body: parametros
        });
        if(respuesta.ok){
            const datos = await respuesta.json()
            respuestaServidor.innerText = `Token: ${datos["access_token"]} tipo de token: ${datos["token_type"]}`;
            //toca guardar el token en el session storage y en el backend proteger rutas
        }else{
            respuestaServidor.innerText = "Credenciales incorrectas";
        }
    }catch (error){
        respuestaServidor.innerText = "No hay conexión";
    }
}
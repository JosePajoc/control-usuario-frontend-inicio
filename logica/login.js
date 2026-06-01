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
        const params = new URLSearchParams();
        params.append("username", usuario.username);
        params.append("password", usuario.password);

        const respuesta = await fetch("http://127.0.0.1:8000/token", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params
        });
        if(respuesta.ok){
            const datos = await respuesta.json()
            respuestaServidor.innerText = `Token: ${datos["access_token"]} tipo de token: ${datos["token_type"]}`;
            //toca guardar el token en el session storage y en el backend proteger rutas
        }
        
    }catch (error){
        respuestaServidor.innerText = "No hay conexión";
    }
}
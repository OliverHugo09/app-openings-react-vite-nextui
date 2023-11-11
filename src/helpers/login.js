export const login = () => {

    if (email === user.email && password === user.password) {
        console.log("Inicio de sesión exitoso")
        // Puedes definir un estado de autenticación aquí
    } else {
        console.log("Credenciales incorrectas")
    }
}

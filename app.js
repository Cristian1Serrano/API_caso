
const express = require('express');//importamos express
const app = express();
const port = 3000;

app.use(express.json());//para que express pueda interpretar el body de las peticiones

let users = []; //array de usuarios
//ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        res.status(400).send('El nombre de usuario ya está en uso');
    } else {
        users.push({ username, password });
        res.send('Usuario registrado con éxito');
    }
});
// ruta para autenticar usuarios
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Autenticación satisfactoria');
    } else {
        res.status(401).send('Error en la autenticación');
    }
});
//iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

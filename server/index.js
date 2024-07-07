//------------MODULOS------------
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'mysql-ailen.alwaysdata.net',
    user: 'ailen_greenheart',
    password: 'greenheart-123',
    database:'ailen_greenheart'

});
connection.connect((error) => {
    if (error){
        return console.error(error);
    }

    console.log("Conectado a la base de datos");

});
// Configurar el body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Ruta para crear un nuevo usuario
app.post('/create-user', (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    // Hashear la contraseña
    bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error al hashear la contraseña');
        }

        const sql = 'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)';
        db.query(sql, [nombre, correo, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send('Error al crear el usuario');
            }
            res.status(201).send('Usuario creado exitosamente');
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



const productsRouter = require("./routes/products.router");
app.use("/products", productsRouter); 

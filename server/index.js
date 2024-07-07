
//------------MODULOS------------
const express = require("express"); 
const path = require("path");
const app = express(); 
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(express.json());
const productsRouter = require("./routes/products.router");
app.use("/products", productsRouter); 
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'mysql-ailen.alwaysdata.net',
    user: 'ailen_greenheart',
    password: 'greenheart-123',
    database:'ailen_greenheart'

});
const PORT = 3000; 

// Configuración de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect(err => {
  if (err) {
      console.error('Error conectando a la base de datos:', err);
      return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Ruta para crear un nuevo usuario
app.post('/create-user', (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  // Validar que todos los campos están presentes
  if (!nombre || !correo || !contraseña) {
      return res.status(400).send('Todos los campos son obligatorios');
  }

  console.log('Datos recibidos:', { nombre, correo, contraseña });

  // Hashear la contraseña
  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
      if (err) {
          console.error('Error al hashear la contraseña:', err);
          return res.status(500).send('Error al hashear la contraseña');
      }

      console.log('Contraseña hasheada:', hashedPassword);

      const sql = 'INSERT INTO users (nombre, correo, contraseña) VALUES (?, ?, ?)';
      db.query(sql, [nombre, correo, hashedPassword], (err, result) => {
          if (err) {
              console.error('Error al crear el usuario:', err);
              return res.status(500).send('Error al crear el usuario');
          }
          res.status(201).send('Usuario creado exitosamente');
      });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(
  express.static(path.join(__dirname, "../public"))
);

app.get("/", (req, res) => {

  res.send(
    "Hola"
  ); 
});




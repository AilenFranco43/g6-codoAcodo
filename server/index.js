//------------MODULOS------------
const express = require("express"); 
const path = require("path");
const app = express(); 
app.use(express.json());


app.use(express.json());

const productsRouter = require("./routes/products.router");


app.use("/products", productsRouter); 




app.use(
  express.static(path.join(__dirname, "../public"))
);

app.get("/", (req, res) => {

  res.send(
    "Hola"
  ); 
});

const PORT = 3000; 

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);

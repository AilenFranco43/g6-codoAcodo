const express = require("express");
const router = express.Router();

const controller = require('./../controllers/products.controller');

router.get('/', controller.index); //obtener todos los productos

router.get('/:id', controller.show); // obtener un producto por id

router.post('/', controller.store); //Agregar nuevo producto
router.put ('/:id', controller.update); //Modificar producto por id
router.delete ('/:id', controller.destroy); //Borrar un producto por id

module.exports = router;
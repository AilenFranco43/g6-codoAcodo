const express = require("express");
const router = express.Router();

const controller = require('./../controllers/products.controller');



router.get('/:id', controller.show);

router.post('/', controller.store);

module.exports = router;
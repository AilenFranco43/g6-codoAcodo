const db = require('../db/db');

const index = (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (error, rows) => {
        if(error){
           return res.status(500).json({error:"Error en la consulta"});
        }

        res.json(rows);
    });
};

const show = (req, res) => {
    const {id} = req.params;

     const sql = 'SELECT * FROM products WHERE product_id = ?';
    db.query(sql, [id], (error, rows) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        if(rows.length == 0){
            return res.status(404).json({error: "No existe el producto"});
        }
        
        res.json(rows[0]);
    });

    
}


const store = (req, res) => {
    const {description, price, stock, category_id, img_url} = req.body;
    const sql = "INSERT INTO products (description, price, stock, category_id, img_url) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [description, price, stock, category_id, img_url], (error, result) => {
        if(error){
            return res.status(500).json({error:"Intente más tarde"});
        }
        res.json(result);
    });
};

module.exports = {
    index,
    show,
    store,
};
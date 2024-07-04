const mysql = require('mysql2');

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

module.exports = connection;
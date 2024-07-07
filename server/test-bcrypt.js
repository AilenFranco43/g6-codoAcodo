const bcrypt = require('bcrypt');

const contraseña = 'mi_contraseña_segura';

bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error al hashear la contraseña:', err);
    } else {
        console.log('Contraseña hasheada:', hashedPassword);
    }
});

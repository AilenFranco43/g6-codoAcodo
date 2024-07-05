//login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'test@example.com' && password === 'password123') {
        alert('Inicio de sesión exitoso');
        $('#loginModal').modal('hide'); // Cerrar modal al iniciar sesión exitosamente
    } else {
        alert('Correo electrónico o contraseña incorrectos');
    }
});




document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('loginModal');
    var openModalBtn = document.getElementById('openModalBtn');
    var closeModalBtn = document.getElementById('closeModalBtn');

    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

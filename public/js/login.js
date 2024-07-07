//login
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (email === 'test@example.com' && password === 'password123') {
            alert('Inicio de sesión exitoso');
            $('#loginModal').modal('hide'); // Cerrar modal al iniciar sesión exitosamente
        } else {
            alert('Correo electrónico o contraseña incorrectos');
        }
    });

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Aquí puedes añadir la lógica para registrar al usuario
        alert(`Registro exitoso para ${name}`);
        $('#loginModal').modal('hide'); // Cerrar modal después del registro exitoso
    });
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

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar eventos
    InputFocusEvents();
    SubjectChangeEvent();
    FormValidation();
    ImageUploadPreview();
});

// elevar label cuando el input está seleccionado
const InputFocusEvents = () => {
    const inputs = document.querySelectorAll('.container-input input, .container-input textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.querySelector('label').classList.remove('focused');
            }
        });
    });
}

// mostrar/ocultar input de imagen según el asunto seleccionado
const SubjectChangeEvent = () => {
    const subjectSelect = document.getElementById('subject');
    const imageUpload = document.getElementById('image-upload');

    subjectSelect.addEventListener('change', () => {
        if (subjectSelect.value === 'reclamo') {
            imageUpload.style.display = 'block';
        } else {
            imageUpload.style.display = 'none';
        }
    });
}

const FormValidation = () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que se envíe el formulario por defecto

        // valores y referencias de los inputs
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();
        const agree = document.querySelector('#agree').checked;
        const imageInput = document.querySelector('#image-input');
        const imageUpload = document.getElementById('image-upload');

        // referencias de los mensajes de error
        const nameError = document.querySelector('#name-error');
        const emailError = document.querySelector('#email-error');
        const messageError = document.querySelector('#message-error');
        const agreeError = document.querySelector('#agree-error');
        const imageError = document.querySelector('#image-error');

        // Reiniciar los mensajes de error al completar el input
        document.querySelectorAll('.container-input input, .container-input textarea').forEach(input => {
            input.addEventListener('input', () => {
                const errorId = input.id + '-error';
                document.getElementById(errorId).textContent = '';
            });
        });

        // Validación y mensajes de error
        let isValid = validateFormFields(name, email, message, imageInput, imageUpload, nameError, emailError, messageError, imageError);

        if (isValid) {
            // Si todo es válido, enviar el formulario
            sendEmail(form);
        }
    });
}

const validateFormFields = (name, email, message, imageInput, imageUpload, nameError, emailError, messageError, imageError) => {
    let isValid = true;

    if (!name) {
        nameError.textContent = 'Por favor, ingresa tu nombre.';
        isValid = false;
    }
    if (!email) {
        emailError.textContent = 'Por favor, ingresa tu correo electrónico.';
        isValid = false;
    }
    if (!message) {
        messageError.textContent = 'Por favor, ingresa tu mensaje.';
        isValid = false;
    }

    // Validación del input de archivo si está visible
    if (imageUpload.style.display === 'block' && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.exec(file.name)) {
            imageError.textContent = 'Solo se permiten archivos con extensión .jpg o .png.';
            isValid = false;
        }
    }

    return isValid;
}

const sendEmail = (form) => {
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then(() => {
            console.log('Correo enviado con éxito!');
        }, (error) => {
            console.log('Error al enviar el correo:', error);
        });

    form.reset();
}

const ImageUploadPreview = () => {
    const imageInput = document.querySelector('#image-input');
    const imageLabel = document.querySelector('.image-label');
    const imagePreview = document.querySelector('.image-preview');
    const imageName = document.querySelector('#image-name');
    const cancelBtn = document.querySelector('#cancel-btn');

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result; // actualizar fuente de la imagen (vista previa)
                imageName.textContent = `Archivo seleccionado: ${file.name}`;
                imageLabel.style.display = 'none';
                cancelBtn.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            resetImagePreview(imagePreview, imageName, imageLabel, cancelBtn);
        }
    });

    cancelBtn.addEventListener('click', () => {
        resetImagePreview(imagePreview, imageName, imageLabel, cancelBtn);
        
    });
}

const resetImagePreview = (imagePreview, imageName, imageLabel, cancelBtn) => {
    const imageInput = document.querySelector('#image-input');

    imageInput.value = '';
    imagePreview.src = '';
    imageName.textContent = '';
    imageLabel.style.display = 'block';
    cancelBtn.style.display = 'none';
    imagePreview.removeAttribute('alt');
}
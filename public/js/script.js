const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.mainNav');
const navIcon = document.querySelector('.nav-icon');

document.addEventListener('DOMContentLoaded', () => {
  menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      navIcon.classList.toggle('open'); 
  });
});

// Mas vendidos

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.querySelectorAll('.carousel-item');

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 5000); // Cambiar imagen cada 5 segundos
}

function moveSlide(n) {
    slideIndex += n;
    showSlides();
}


 //scroll behaviour
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const offset = target.offsetTop;
            const targetPosition = offset - (window.innerHeight / 2) + (target.clientHeight / 2);
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
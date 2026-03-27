// ===== Carousel JS =====
const slides = document.querySelectorAll('.slide');

slides.forEach(slide => {
    const nextBtn = slide.querySelector('.next');
    const prevBtn = slide.querySelector('.prev');

    nextBtn.addEventListener('click', () => {
        const currentIndex = [...slides].findIndex(s => s.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.remove('active');
        slides[nextIndex].classList.add('active');
    });

    prevBtn.addEventListener('click', () => {
        const currentIndex = [...slides].findIndex(s => s.classList.contains('active'));
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[currentIndex].classList.remove('active');
        slides[prevIndex].classList.add('active');
    });
});

// Fade-in testimonials on scroll
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

const observerOptions = {
  threshold: 0.1 // triggers when 10% of element is visible
};

const testimonialObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop observing once visible
    }
  });
}, observerOptions);

testimonialSlides.forEach(slide => testimonialObserver.observe(slide));
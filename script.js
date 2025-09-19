document.addEventListener("DOMContentLoaded", function() {

    // --- Typewriter Animation ---
    const typedTextSpan = document.querySelector('.typed-text-highlight');
    const textArray = ["Web Developer.", "Front-End Developer.", "UI/UX Designer."]; // Added more options
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            // Pause before erasing
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            // Pause before typing next
            setTimeout(type, 1000);
        }
    }

    // Start the typewriter effect
    if (typedTextSpan) { // Ensure element exists
        setTimeout(type, 1500);
    }

    // --- Scroll Animations with IntersectionObserver ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll, .section-title, .about-description, .about-details, #contact-form');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                    // Add specific animation classes based on element type
                    if (entry.target.classList.contains('skill-item') || entry.target.classList.contains('project-card')) {
                        entry.target.style.animation = `slideInFromBottom 1s ease-out ${delay}s forwards`;
                    } else if (entry.target.classList.contains('section-title') || entry.target.classList.contains('about-description') || entry.target.classList.contains('about-details') || entry.target.id === 'contact-form') {
                         entry.target.style.animation = `fadeInUp 1s ease-out ${delay}s forwards`;
                    }
                    observer.unobserve(entry.target); // Stop observing once animated
                }, delay * 1000); // Convert delay to milliseconds
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        element.classList.add('animated-hidden'); // Hide elements initially via CSS
        observer.observe(element);
    });

    // Initial animations for hero section elements
    document.querySelector('.animate-zoom-in')?.classList.add('is-visible');
    document.querySelector('.animate-slide-left')?.classList.add('is-visible');
    document.querySelectorAll('.animate-fade-in-up').forEach(el => el.classList.add('is-visible'));


    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
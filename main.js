// Navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we can unobserve if we only want it to happen once
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // Reveal when 15% of element is visible
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Product Data
const productData = {
    'fluye': {
        title: 'Momentum Fluye',
        tag: 'Bienestar',
        description: 'Encuentra tu centro con una mezcla diseñada para armonizar tu sistema. Rica en fibra natural y prebióticos que favorecen una digestión ligera y un equilibrio constante.',
        image: 'assets/bar_fluye.png',
        benefits: ['Mejora la digestión', 'Prebióticos naturales', 'Sin azúcar añadida', 'Fibra de alta calidad']
    },
    'respira': {
        title: 'Momentum Respira',
        tag: 'Calma',
        description: 'Un momento de pausa en tu día. Formulada con ingredientes que promueven la relajación muscular y la calma mental, ideal para recuperarte después de un momento de estrés.',
        image: 'assets/bar_respira.png',
        benefits: ['Reduce el cortisol', 'Magnesio natural', 'Efecto relajante', 'Ingredientes botánicos']
    },
    'ilumina': {
        title: 'Momentum Ilumina',
        tag: 'Claridad',
        description: 'Potencia tus ideas con energía limpia. Esta barra combina superalimentos que nutren tu cerebro, mejorando la retención y la agilidad mental para tus proyectos más creativos.',
        image: 'assets/bar_ilumina.png',
        benefits: ['Enfoque cognitivo', 'Antioxidantes', 'Vitamina B complex', 'Energía cerebral']
    },
    'enfoca': {
        title: 'Momentum Enfoca',
        tag: 'Rendimiento',
        description: 'El combustible para tus desafíos físicos y mentales. Diseñada para una liberación sostenida de energía que te permite mantener el rendimiento máximo durante horas.',
        image: 'assets/bar_enfoca.png',
        benefits: ['Energía prolongada', 'Proteína vegetal', 'Bajo índice glucémico', 'Resistencia física']
    }
};

// Modal Elements
const modal = document.getElementById('product-modal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');
const modalImg = document.getElementById('modal-img');
const modalTag = document.getElementById('modal-tag');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalBenefits = document.getElementById('modal-benefits');
const buyButton = modal.querySelector('.buy-button');

// Function to open modal
function openModal(productId) {
    const product = productData[productId];
    if (!product) return;

    modalImg.src = product.image;
    modalImg.alt = product.title;
    modalTag.textContent = product.tag;
    modalTag.className = `product-tag tag-${productId}`; // Dynamic class for styling if needed
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    
    // Clear and add benefits
    modalBenefits.innerHTML = '';
    product.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        modalBenefits.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

// Function to close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

// Event Listeners for Product Cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const productId = card.getAttribute('data-product-id');
        if (productId) openModal(productId);
    });
});

// Close Modal Events
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Buy Button Action
buyButton.addEventListener('click', () => {
    const productTitle = modalTitle.textContent;
    alert(`¡Excelente elección! Redirigiendo al proceso de pago para ${productTitle}...`);
});

// Basic Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`¡Gracias por unirte, ${email}! Pronto recibirás novedades de Momentum.`);
        newsletterForm.reset();
    });
}

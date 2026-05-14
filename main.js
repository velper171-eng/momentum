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
        description: 'Recupera tu ligereza natural y despídete de la pesadez. Momentum Fluye está cuidadosamente diseñada para ser tu aliada perfecta después de las comidas o en esos días donde tu cuerpo pide un respiro. Gracias a las propiedades digestivas y antiinflamatorias naturales del jengibre y la frescura de la piña, combinadas con la suavidad del coco, esta barra trabaja en completa armonía con tu sistema digestivo.',
        image: 'assets/bar_fluye.png',
        benefits: ['Optimización Digestiva', 'Acción Antiinflamatoria', 'Bienestar Corporal', 'Energía Natural'],
        price: '$15.000 COP'
    },
    'respira': {
        title: 'Momentum Respira',
        tag: 'Calma',
        description: 'Encuentra tu centro y regálate un santuario de paz en medio del caos diario. Momentum Respira es mucho más que un snack; es un momento de autocuidado convertido en barra. Formulada con las notas aromáticas y funcionales de la lavanda y el sabor reconfortante del cacao y la mora, sus ingredientes actúan de manera sinérgica para promover la relajación del sistema nervioso.',
        image: 'assets/bar_respira.png',
        benefits: ['Control del Estrés', 'Equilibrio Alimenticio', 'Relajación Mental', 'Pausa Saludable'],
        price: '$15.000 COP'
    },
    'ilumina': {
        title: 'Momentum Ilumina',
        tag: 'Claridad',
        description: 'El verdadero brillo nace desde tu interior. Momentum Ilumina es el complemento perfecto para potenciar tu rutina de belleza y cuidado personal. Creada bajo la premisa de que la salud que cultivas por dentro se refleja en el exterior, esta deliciosa mezcla de fresa, coco y vainilla está cargada de nutrientes esenciales para tu piel, cabello y uñas.',
        image: 'assets/bar_ilumina.png',
        benefits: ['Cuidado Dermatológico', 'Fortalecimiento Capilar', 'Salud en Uñas', 'Antioxidante Natural'],
        price: '$15.000 COP'
    },
    'enfoca': {
        title: 'Momentum Enfoca',
        tag: 'Rendimiento',
        description: 'Despierta tu mente y eleva tu productividad sin sacrificar tu equilibrio. Momentum Enfoca es la barra definitiva para mentes exigentes. Su ingrediente estrella, el hongo adaptógeno Melena de León, es reconocido por estimular la agilidad mental, mejorando la concentración, la memoria y el enfoque.',
        image: 'assets/bar_enfoca.png',
        benefits: ['Agilidad Mental', 'Energía Sostenida', 'Apoyo Cognitivo', 'Rendimiento Prolongado'],
        price: '$15.000 COP'
    },
    'pack-6': {
        title: 'Primer Impulso',
        tag: 'Colección',
        description: 'La introducción perfecta al mundo Momentum. Este pack contiene una selección variada de nuestras barras funcionales, ideal para quienes buscan equilibrio y energía durante su semana laboral o de entrenamiento.',
        image: 'assets/pack_6.png',
        benefits: ['Variedad de sabores', 'Ahorro por volumen', 'Empaque eco-amigable', 'Ideal para regalo'],
        price: '$68.000 COP'
    },
    'pack-8': {
        title: 'Momento Vital',
        tag: 'Favoritos',
        description: 'Dos de cada una de nuestras barras insignia (Fluye, Respira, Ilumina, Enfoca). El equilibrio perfecto para tu rutina diaria, asegurando que tengas el impulso adecuado para cada momento del día.',
        image: 'assets/pack_8.png',
        benefits: ['2 de cada variedad', 'Suministro semanal', 'Nutrición balanceada', 'Precio preferencial'],
        price: '$75.000 COP'
    },
    'pack-16': {
        title: 'Power Pack',
        tag: 'Elite',
        description: 'La experiencia Momentum completa. Este pack de 16 unidades te garantiza una nutrición funcional constante y variada. Diseñado para optimizar tu rendimiento a largo plazo y compartir bienestar con quienes más quieres.',
        image: 'assets/pack_16.png',
        benefits: ['Máximo ahorro', 'Stock completo', 'Perfecto para familias', 'Incluye guía de bienestar'],
        price: '$137.000 COP'
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
const modalPrice = modal.querySelector('.modal-price');
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
    modalPrice.textContent = product.price || '$4.500 COP';
    
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

// Event Listeners for Product and Pack Cards
document.querySelectorAll('.product-card, .pack-card').forEach(card => {
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

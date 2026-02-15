/**
 * BRUNO MARIANO SILVA - PORTFOLIO
 * JavaScript Puro - Chatbot Simplificado (Apenas Serviços)
 */

// ============================================================================
// Initialize on DOM Load
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-quad',
            once: true,
            offset: 100,
        });
    }

    // Initialize Gallery Filter
    initGalleryFilter();

    // Initialize Modal Functions
    initModalFunctions();

    // Smooth Scroll for Navigation Links
    initSmoothScroll();

    // Initialize Scroll Top Button
    initScrollTopButton();

    // Initialize Chatbot
    initChatbot();
});

// ============================================================================
// SCROLL TOP BUTTON
// ============================================================================

function initScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================================
// CHATBOT WIDGET - SIMPLIFICADO (APENAS SERVIÇOS)
// ============================================================================

function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const closeChatbot = document.getElementById('closeChatbot');

    if (!chatbotToggle || !chatbotWidget || !closeChatbot) return;

    // Abrir/Fechar chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWidget.style.display = 'flex';
        chatbotWidget.classList.add('open');
        // Não escondemos o toggle para manter o alinhamento visual se desejado, 
        // ou escondemos apenas ele sem afetar o botão de topo.
        chatbotToggle.style.opacity = '0';
        chatbotToggle.style.pointerEvents = 'none';
        showServiceOptions();
    });

    closeChatbot.addEventListener('click', () => {
        chatbotWidget.classList.remove('open');
        setTimeout(() => {
            chatbotWidget.style.display = 'none';
            chatbotToggle.style.opacity = '1';
            chatbotToggle.style.pointerEvents = 'auto';
        }, 300);
    });
}

function showServiceOptions() {
    const footer = document.getElementById('chatbotFooter');
    footer.innerHTML = '';
    
    const services = [
        { emoji: '⚡', name: 'Landing Page', message: 'Tenho interesse em uma Landing Page' },
        { emoji: '🛡️', name: 'Site Institucional', message: 'Tenho interesse em um Site Institucional' },
        { emoji: '⚙️', name: 'Suporte e Manutenção', message: 'Tenho interesse em Suporte e Manutenção' }
    ];
    
    services.forEach(service => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-service';
        btn.innerHTML = `<span class="service-emoji">${service.emoji}</span> ${service.name}`;
        btn.onclick = () => selectService(service.message);
        footer.appendChild(btn);
    });
}

function selectService(message) {
    sendToWhatsApp(message);
}

function sendToWhatsApp(message) {
    const whatsappURL = `https://wa.me/5547991597258?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    
    // Fechar chatbot após enviar
    setTimeout(() => {
        const chatbotWidget = document.getElementById('chatbotWidget');
        const chatbotToggle = document.getElementById('chatbotToggle');
        chatbotWidget.classList.remove('open');
        chatbotToggle.classList.remove('hidden');
    }, 500);
}

// ============================================================================
// Gallery Filter Functionality
// ============================================================================

function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // Trigger animation
                    setTimeout(() => {
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = '';
                        }, 10);
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });

            // Reinitialize AOS for new items
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
}

// ============================================================================
// Modal Functions for Project Details
// ============================================================================

function openProject(id, title, description, image, link) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalLabel');
    const projectImage = document.getElementById('projectImage');
    const projectDescription = document.getElementById('projectDescription');
    const projectLink = document.getElementById('projectLink');

    modalTitle.textContent = title;
    projectImage.src = image;
    projectImage.alt = title;
    projectDescription.textContent = description;
    projectLink.href = link;
}

function initModalFunctions() {
    // Modal initialization is handled by Bootstrap
    // This function can be extended for custom modal behavior
}

// ============================================================================
// Smooth Scroll for Navigation Links
// ============================================================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's a modal trigger
            if (this.hasAttribute('data-bs-toggle')) {
                return;
            }

            // Check if target exists
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    toggler.click();
                }

                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================================================
// Utility Functions
// ============================================================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================================================
// Lazy Loading for Images
// ============================================================================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================================================
// Analytics Tracking (Optional)
// ============================================================================

document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href*="wa.me"], a[href*="instagram"]');
    if (target) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'link_url': target.href,
                'link_text': target.textContent
            });
        }
    }
});

// ============================================================================
// Accessibility Enhancements
// ============================================================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const closeBtn = modal.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.click();
            }
        }
    }
});

// ============================================================================
// Performance Monitoring
// ============================================================================

window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

console.log('✅ Bruno Mariano Silva Portfolio - JavaScript Loaded');

// ========================================
// Naina's 21st Birthday Website JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Start confetti effect
    createConfetti();
    
    // Initialize gallery tabs
    initGalleryTabs();
    
    // Initialize messages carousel
    initMessagesCarousel();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Add scroll effects
    initScrollEffects();
});

// ========================================
// Confetti Effect
// ========================================
function createConfetti() {
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFE4E9', '#FFD700', '#87CEEB'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            z-index: 9999;
            pointer-events: none;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Repeat confetti every 30 seconds
    setInterval(createConfetti, 30000);
}

// ========================================
// Gallery Tab Functionality
// ========================================
function initGalleryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.gallery-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ========================================
// Messages Carousel Functionality
// ========================================
function initMessagesCarousel() {
    const slides = document.querySelectorAll('.message-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    setInterval(nextSlide, 5000);
}

// ========================================
// Smooth Scrolling
// ========================================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
    const wishCards = document.querySelectorAll('.wish-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    wishCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 20, 147, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 105, 180, 0.95)';
        }
    });
}

// ========================================
// Cake Cutting Function
// ========================================
function cutCake() {
    const cakeContainer = document.querySelector('.cake-container');
    const cakeMessage = document.getElementById('cake-message');
    const cakePieces = document.getElementById('cake-pieces');
    const candles = document.querySelectorAll('.candle-flame');
    
    // Check if already cut
    if (cakeContainer.classList.contains('cut')) {
        return;
    }
    
    // Add cut class
    cakeContainer.classList.add('cut');
    
    // Blow out candles
    candles.forEach(candle => {
        candle.style.animation = 'none';
        candle.style.opacity = '0';
    });
    
    // Show message after animation
    setTimeout(() => {
        cakeMessage.classList.add('show');
        
        // Create mini confetti burst
        createConfetti();
        setTimeout(createConfetti, 500);
        setTimeout(createConfetti, 1000);
    }, 1000);
    
    // Show cake pieces
    setTimeout(() => {
        cakePieces.classList.add('show');
    }, 1500);
}

// ========================================
// Gift Opening Function
// ========================================
function openGift(giftNumber) {
    const gift = document.querySelector(`.gift-${giftNumber}`);
    const giftRewards = document.getElementById('gift-rewards');
    const rewards = document.querySelectorAll('.reward');
    
    // Check if already opened
    if (gift.classList.contains('opened')) {
        return;
    }
    
    // Mark gift as opened
    gift.classList.add('opened');
    
    // Update message
    const message = gift.querySelector('.gift-message');
    const messages = ['💝 Love & Affection', '💰 Financial Success', '🎯 Achievement', '🌟 Bright Future'];
    message.textContent = messages[giftNumber - 1];
    
    // Show the reward
    const reward = document.querySelector(`.reward-${giftNumber}`);
    reward.classList.add('show');
    
    // Show rewards container
    giftRewards.classList.add('show');
    
    // Create confetti
    createConfetti();
    
    // Check if all gifts are opened
    const allOpened = document.querySelectorAll('.gift.opened').length;
    if (allOpened === 4) {
        // Extra celebration for opening all gifts
        setTimeout(createConfetti, 500);
        setTimeout(createConfetti, 1000);
        setTimeout(createConfetti, 1500);
    }
}

// ========================================
// Floating Hearts Effect
// ========================================
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 20}px;
            left: ${Math.random() * 100}%;
            top: 100%;
            opacity: 0;
            z-index: 9998;
            pointer-events: none;
            animation: float-up ${Math.random() * 3 + 2}s ease-out forwards;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 3000);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

createFloatingHearts();

// ========================================
// Birthday Message Alert
// ========================================
window.addEventListener('load', function() {
    setTimeout(() => {
        const greeting = document.createElement('div');
        greeting.id = 'birthday-greeting';
        greeting.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FF69B4, #FF1493);
            color: white;
            padding: 40px 60px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(255, 105, 180, 0.5);
            animation: popIn 0.5s ease;
        `;
        
        greeting.innerHTML = `
            <h2 style="font-family: 'Dancing Script', cursive; font-size: 3rem; margin-bottom: 20px;">
                🎉 Happy 21st Birthday Naina! 🎂
            </h2>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">
                Wishing you a day filled with love, laughter, and all your heart desires!
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #FF1493;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-size: 1rem;
                cursor: pointer;
                font-weight: bold;
            ">
                Thank You! 💕
            </button>
        `;
        
        document.body.appendChild(greeting);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            if (greeting.parentElement) {
                greeting.remove();
            }
        }, 10000);
    }, 1500);
});

console.log('🎉 Happy 21st Birthday Naina! 🎂');
console.log('Made with love 💕');

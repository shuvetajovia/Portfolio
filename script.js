/* ----------------------------------------------------
   Shuveta Jovi - Portfolio JavaScript Interactions
------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialise Lucide Icons
    lucide.createIcons();

    // 1. Theme Management (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Determine initial theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcons(savedTheme);
    } else {
        // Default to dark mode as requested, fallback to system
        const initialTheme = systemPrefersDark.matches ? 'dark' : 'dark';
        document.documentElement.setAttribute('data-theme', initialTheme);
        updateThemeToggleIcons(initialTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeToggleIcons(newTheme);
        
        // Re-read CSS variables for canvas particles
        if (window.particleSystem) {
            window.particleSystem.updateColors();
        }
    });

    function updateThemeToggleIcons(theme) {
        // Lucide parses data-lucide attributes, we can toggle visible icons
        const sun = themeToggleBtn.querySelector('.sun-icon');
        const moon = themeToggleBtn.querySelector('.moon-icon');
        
        if (theme === 'light') {
            sun.classList.remove('hidden');
            moon.classList.add('hidden');
        } else {
            sun.classList.add('hidden');
            moon.classList.remove('hidden');
        }
    }

    // 2. Mobile Menu Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuOpenIcon = mobileToggle.querySelector('.menu-open');
    const menuCloseIcon = mobileToggle.querySelector('.menu-close');

    function toggleMenu() {
        navbar.classList.toggle('mobile-active');
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
    }

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('mobile-active')) {
                toggleMenu();
            }
        });
    });

    // 3. Dynamic Typing Effect (Hero Subtitle)
    const typedTextSpan = document.getElementById('typed-text');
    const phrases = ["Machine Learning Engineer", "Computer Vision Researcher", "Cloud Enthusiast"];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newPhraseDelay = 2000;
    let phraseIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < phrases[phraseIndex].length) {
            typedTextSpan.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newPhraseDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, typingSpeed + 300);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Trigger skill progress bars specifically when skills card reveals
                if (entry.target.classList.contains('skills-card')) {
                    animateSkills(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    function animateSkills(cardElement) {
        const progressBars = cardElement.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Active Nav Link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // 5. Experience / Education Timeline Tabs
    const timelineTabBtns = document.querySelectorAll('.timeline-tab-btn');
    const workTimeline = document.getElementById('work-timeline');
    const educationTimeline = document.getElementById('education-timeline');

    timelineTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timelineTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tab = btn.getAttribute('data-tab');
            if (tab === 'work') {
                workTimeline.classList.add('active');
                educationTimeline.classList.remove('active');
            } else {
                workTimeline.classList.remove('active');
                educationTimeline.classList.add('active');
            }
        });
    });

    // 6. Project Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('fade-out');
                    card.classList.add('fade-in');
                    card.style.display = 'flex';
                } else {
                    card.classList.add('fade-out');
                    card.classList.remove('fade-in');
                    // Add delay to display none for transition fade-out duration
                    setTimeout(() => {
                        if (card.classList.contains('fade-out')) {
                            card.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });

    // 7. Interactive Canvas Particle Background (Connected Nodes)
    class ParticleNetwork {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.connectionDistance = 110;
            this.mouse = { x: null, y: null, radius: 150 };
            
            this.init();
            this.resize();
            this.createParticles();
            this.animate();
            this.setupListeners();
            this.updateColors();
        }

        init() {
            this.particleCount = window.innerWidth < 768 ? 40 : 100;
        }

        updateColors() {
            // Extract colors from CSS variables
            const styles = getComputedStyle(document.documentElement);
            this.primaryColor = styles.getPropertyValue('--accent-primary').trim() || '#8b5cf6';
            this.secondaryColor = styles.getPropertyValue('--accent-secondary').trim() || '#06b6d4';
            
            // Format colors with transparencies
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            this.particleColor = isLight ? 'rgba(109, 40, 217, 0.25)' : 'rgba(139, 92, 246, 0.35)';
            this.lineColor = isLight ? 'rgba(8, 145, 178, 0.06)' : 'rgba(6, 182, 212, 0.1)';
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.init();
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * (this.canvas.width - size * 2) + size;
                const y = Math.random() * (this.canvas.height - size * 2) + size;
                const directionX = (Math.random() * 0.4) - 0.2;
                const directionY = (Math.random() * 0.4) - 0.2;
                
                this.particles.push({ x, y, size, directionX, directionY });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw connections first
            this.drawConnections();

            // Update & Draw particles
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                
                // Movement
                p.x += p.directionX;
                p.y += p.directionY;
                
                // Wall Bounce
                if (p.x < 0 || p.x > this.canvas.width) p.directionX = -p.directionX;
                if (p.y < 0 || p.y > this.canvas.height) p.directionY = -p.directionY;
                
                // Mouse repulsion effect (subtle push)
                if (this.mouse.x != null && this.mouse.y != null) {
                    const dx = this.mouse.x - p.x;
                    const dy = this.mouse.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.mouse.radius) {
                        const force = (this.mouse.radius - distance) / this.mouse.radius;
                        p.x -= (dx / distance) * force * 1.5;
                        p.y -= (dy / distance) * force * 1.5;
                    }
                }
                
                // Draw Node
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
                this.ctx.fillStyle = this.particleColor;
                this.ctx.fill();
            }
            
            requestAnimationFrame(this.animate.bind(this));
        }

        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.connectionDistance) {
                        // Compute line opacity based on distance
                        const opacity = (1 - (distance / this.connectionDistance)) * 0.85;
                        this.ctx.strokeStyle = this.lineColor.replace(/[\d\.]+\)$/, `${opacity})`);
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p1.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                    }
                }
            }
        }

        setupListeners() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });
            
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
            
            window.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
    }

    // Initialise Particle System background
    window.particleSystem = new ParticleNetwork('neural-canvas');

    // 8. Contact Form Client-side Handler
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtnText = document.getElementById('submit-btn-text');
    const submitBtnIcon = document.getElementById('submit-btn-icon');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Visual transition for submitting
            submitBtnText.textContent = "Sending...";
            submitBtnIcon.setAttribute('data-lucide', 'loader-2');
            submitBtnIcon.classList.add('animate-spin'); // Custom spinner class can be added
            lucide.createIcons(); // Re-render icons
            
            // Simulate API request / Email client trigger
            setTimeout(() => {
                submitBtnText.textContent = "Send Message";
                submitBtnIcon.setAttribute('data-lucide', 'send');
                submitBtnIcon.classList.remove('animate-spin');
                lucide.createIcons();
                
                if (name && email && message) {
                    // Show success block
                    formFeedback.textContent = `Thank you, ${name}! Your message has been simulated. Opening your email app to send...`;
                    formFeedback.className = "form-feedback success";
                    formFeedback.classList.remove('hidden');
                    
                    // Trigger mailto client
                    const mailtoLink = `mailto:shuvetajovi2006a@gmail.com?subject=Contact%20from%20Portfolio%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom%3A%20${encodeURIComponent(name)}%20%3C${encodeURIComponent(email)}%3E`;
                    window.location.href = mailtoLink;
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide feedback after 5 seconds
                    setTimeout(() => {
                        formFeedback.classList.add('hidden');
                    }, 6000);
                } else {
                    formFeedback.textContent = "Please fill in all details before submitting.";
                    formFeedback.className = "form-feedback error";
                    formFeedback.classList.remove('hidden');
                }
            }, 1200);
        });
    }
});

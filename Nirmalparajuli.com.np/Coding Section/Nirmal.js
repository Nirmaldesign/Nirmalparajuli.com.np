// Enhanced JavaScript for Design Agency Website

document.addEventListener("DOMContentLoaded", function() {
    // ===== DOM ELEMENTS =====
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("main-nav");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const logoContainer = document.getElementById("logo-container");
    const homeButtons = document.querySelectorAll(".home-buttons .btn");
    const faqQuestions = document.querySelectorAll('.faq-question');
    const serviceCards = document.querySelectorAll('.service-card');
    const contactBtn = document.querySelector('.contact-submit-btn');

    // ===== LOADING SPINNER =====
    loadingSpinner.style.display = 'flex';
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 500);
    });

    // ===== MOBILE MENU TOGGLE =====
    menuToggle.addEventListener("click", function() {
        this.classList.toggle("active");
        mainNav.classList.toggle("active");
        
        if (mainNav.classList.contains("active")) {
            const links = mainNav.querySelectorAll('a');
            links.forEach((link, index) => {
                link.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
            });
        } else {
            mainNav.querySelectorAll('a').forEach(link => {
                link.style.animation = "";
            });
        }
    });

    // ===== SMOOTH SCROLLING =====
    function handleLinkClick(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Adjust scroll position for fixed headers if needed
            const headerOffset = 80; // Change this value to match your header height
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            history.pushState(null, null, targetId);
        }

        if (mainNav.classList.contains("active")) {
            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");
        }

        setTimeout(updateActiveNav, 300);
    }

    navLinks.forEach(link => link.addEventListener("click", handleLinkClick));
    logoContainer.addEventListener("click", handleLinkClick);
    homeButtons.forEach(button => button.addEventListener("click", handleLinkClick));

    // ===== ACTIVE NAV LINK UPDATER =====
    function updateActiveNav() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    // Set initial active link
    function setInitialActive() {
        if (window.location.hash) {
            const initialActive = document.querySelector(`nav a[href="${window.location.hash}"]`);
            if (initialActive) {
                navLinks.forEach(link => link.classList.remove("active"));
                initialActive.classList.add("active");
                return;
            }
        }
        navLinks[0].classList.add("active");
    }
    setInitialActive();

    // ===== FAQ FUNCTIONALITY WITH TEXT ANIMATION =====
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');
            
            // Close all FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            });
            
            // Open clicked FAQ if not already open
            if (!isOpen) {
                question.classList.add('active');
                answer.classList.add('show');

                // Animate answer text
                const answerTexts = answer.querySelectorAll('p, strong, br');
                answerTexts.forEach((text, index) => {
                    text.style.animation = `textReveal 0.3s ease ${index * 0.1}s forwards`;
                });

                // Mobile scroll to answer
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        answer.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                }
            }
        });
    });

    // ===== DESKTOP FAQ HOVER EFFECTS =====
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.faq').forEach(faq => {
            faq.addEventListener('mouseenter', () => {
                faq.style.transform = 'translateY(-5px) rotateX(2deg)';
            });
            
            faq.addEventListener('mouseleave', () => {
                faq.style.transform = 'translateY(0) rotateX(0)';
            });
        });
    }

    // === Scroll-triggered Design Process Animation ===
    const stepElements = document.querySelectorAll(".step");
    const processContainer = document.querySelector(".process-container");

    if (stepElements.length > 0 && processContainer) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    stepElements.forEach((step, i) => {
                        setTimeout(() => {
                            step.classList.add("active");
                        }, i * 400);
                    });
                    observer.disconnect(); // Run once
                }
            });
        }, { threshold: 0.3 });

        observer.observe(processContainer);
    }
    
    // ===== SERVICE CARDS ANIMATION =====
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => serviceObserver.observe(card));
    
    // ===== SERVICE IMAGE RESIZING =====
    function resizeServiceImages() {
        const images = document.querySelectorAll('.service-image');
        const cardWidth = document.querySelector('.service-card')?.offsetWidth;
        
        if (cardWidth) {
            images.forEach(img => {
                img.style.height = `${Math.min(250, cardWidth * 0.6)}px`;
            });
        }
    }
    
    resizeServiceImages();
    window.addEventListener('resize', resizeServiceImages);

    // ===== SCROLL PERFORMANCE OPTIMIZATION =====
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateOnScroll() {
        // Placeholder for performance scroll logic
    }
    
    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ===== SECTION FADE-IN ANIMATIONS =====
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        sectionObserver.observe(section);
    });

    // ===== ANIMATION PAUSE FOR PERFORMANCE =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
    }, observerOptions);

    document.querySelectorAll('.scrolling-track').forEach(track => {
        observer.observe(track);
    });
// ===== SERVICE TO CONTACT AUTOSELECT =====
document.querySelectorAll('.service-cta, .service-card, .service-thumbnail').forEach(element => {
    element.addEventListener('click', function(e) {
        // Only trigger if it's a direct click on a CTA, card, or thumbnail (not on links inside)
        if (
            this.classList.contains('service-cta') ||
            this.classList.contains('service-card') ||
            this.classList.contains('service-thumbnail')
        ) {
            e.preventDefault();

            // Get service name from data-service, fallback to heading or alt/title
            let serviceName = '';
            let serviceCard = this.closest('.service-card') || this;

            // Try data-service attribute
            serviceName = serviceCard?.dataset?.service;

            // Fallback: try to get from a heading inside the card
            if (!serviceName) {
                const heading = serviceCard?.querySelector('.service-title, h3, h2, h4');
                serviceName = heading ? heading.textContent.trim() : '';
            }

            // Fallback: if thumbnail, try alt/title
            if (!serviceName && this.classList.contains('service-thumbnail')) {
                serviceName = this.getAttribute('alt') || this.getAttribute('title') || '';
            }

            // Scroll to contact section smoothly
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Update URL hash
            history.pushState(null, null, '#contact');

            // Update active nav
            if (typeof updateActiveNav === 'function') updateActiveNav();

            // Set dropdown value after short delay
            setTimeout(() => {
                // Try to find the select inside the contact form
                const select = document.querySelector('.contact-form select, #form select');
                if (select && serviceName) {
                    // Find the option that matches the service name (case-insensitive, ignore spaces and special chars)
                    const normalize = str => str.replace(/[\s\-_.]+/g, '').toLowerCase();
                    const normalizedService = normalize(serviceName);

                    let found = false;
                    Array.from(select.options).forEach(opt => {
                        if (
                            normalize(opt.value) === normalizedService ||
                            normalize(opt.text) === normalizedService
                        ) {
                            select.value = opt.value;
                            // Force trigger change event
                            const event = new Event('change', { bubbles: true });
                            select.dispatchEvent(event);
                            found = true;
                        }
                    });

                    // If not found, try partial match (for cases like "YouTube Thumbnail Design" vs "YouTube Thumbnail")
                    if (!found) {
                        Array.from(select.options).forEach(opt => {
                            if (
                                normalize(opt.value).includes(normalizedService) ||
                                normalize(opt.text).includes(normalizedService) ||
                                normalizedService.includes(normalize(opt.value)) ||
                                normalizedService.includes(normalize(opt.text))
                            ) {
                                select.value = opt.value;
                                const event = new Event('change', { bubbles: true });
                                select.dispatchEvent(event);
                            }
                        });
                    }
                }
            }, 600); // Slightly longer delay to ensure form is visible
        }
    });
});
    // ===== CONTACT FORM SUBMISSION WITH WEB3FORMS =====
    if (contactBtn) {
        const form = document.getElementById('form');
        const result = document.getElementById('result');

        contactBtn.addEventListener('click', function (e) {
            e.preventDefault();

            loadingSpinner.style.display = 'flex';

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            result.style.display = "block";
            result.innerHTML = "Please wait...";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                const json = await response.json();
                if (response.status === 200) {
                    result.innerHTML = "Form submitted successfully!";
                } else {
                    console.log(response);
                    result.innerHTML = json.message || "Submission failed.";
                }
            })
            .catch(error => {
                console.error(error);
                result.innerHTML = "Something went wrong!";
            })
            .finally(() => {
                loadingSpinner.style.display = 'none';
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
        });
    }
});

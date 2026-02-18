


    
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#FFD700',
                        secondary: '#1a7440',
                        accent: '#f97316',
                        dark: '#0f172a',
                        light: '#f8fafc',
                    },
                    fontFamily: {
                        'sans': ['Noto Sans', 'sans-serif'],
                        'serif': ['Noto Serif', 'serif'],
                    }
                }
            }
        }

        // Header scroll effect logic
        const header = document.getElementById('main-header');
        const topBar = document.getElementById('top-bar');
        const navbar = document.getElementById('navbar');
        const navLogo = document.getElementById('nav-logo');
        const brandName = document.getElementById('brand-name');
        const brandSubtext = document.getElementById('brand-subtext');

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // 1. Handle Hide/Show on Scroll Direction
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                // Scrolling Down - Hide Header
                header.classList.add('header-hidden');
            } else {
                // Scrolling Up - Show Header
                header.classList.remove('header-hidden');
            }

            // 2. Handle Shrink/Compact Design
            if (currentScrollY > 20) {
                // Compact Mode
                topBar.style.height = '0px';
                topBar.style.opacity = '0';
                navbar.classList.remove('py-4');
                navbar.classList.add('py-2', 'header-scrolled');

                // Adjust Brand Branding
                if (navLogo) navLogo.style.height = '37px';
                if (brandName) brandName.classList.add('text-lg');
                if (brandSubtext) brandSubtext.classList.add('hidden');
            } else {
                // Full Mode
                topBar.style.height = 'auto';
                topBar.style.opacity = '1';
                navbar.classList.remove('py-2', 'header-scrolled');
                navbar.classList.add('py-4');

                if (navLogo) navLogo.style.height = '44px'; // Original size
                if (brandName) brandName.classList.remove('text-lg');
                if (brandSubtext) brandSubtext.classList.remove('hidden');

                // Ensure header is visible at the very top
                header.classList.remove('header-hidden');
            }

            lastScrollY = currentScrollY;
        });
    

    
        document.addEventListener('DOMContentLoaded', function () {
            const observerOptions = {
                threshold: 0.2 // Trigger when 20% of the section is visible
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate the left text content
                        const leftSide = entry.target.querySelector('.reveal-left');
                        leftSide.classList.remove('opacity-0', '-translate-x-20');
                        leftSide.classList.add('opacity-100', 'translate-x-0');

                        // Animate the right image grid
                        const rightSide = entry.target.querySelector('.reveal-right');
                        rightSide.classList.remove('opacity-0', 'translate-x-20');
                        rightSide.classList.add('opacity-100', 'translate-x-0');

                        // Animate the internal Vision/Mission boxes
                        const items = entry.target.querySelectorAll('.reveal-item');
                        items.forEach(item => {
                            item.classList.remove('opacity-0', 'translate-y-10');
                            item.classList.add('opacity-100', 'translate-y-0');
                        });

                        // Stop observing once animation is done
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Start watching the About section
            const aboutSection = document.querySelector('#about');

            // Initial State Setup (Manual helper)
            aboutSection.querySelector('.reveal-left').classList.add('-translate-x-20');
            aboutSection.querySelector('.reveal-right').classList.add('translate-x-20');

            observer.observe(aboutSection);
        });
    

    
        document.addEventListener('DOMContentLoaded', function () {
            const statsSection = document.querySelector('#stats-section');
            const counters = document.querySelectorAll('.counter');
            const speed = 200; // Lower is faster

            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 1. Reveal the boxes
                        const grid = entry.target.querySelector('.reveal-stats');
                        grid.classList.remove('opacity-0', 'translate-y-10');
                        grid.classList.add('opacity-100', 'translate-y-0');

                        // 2. Start the counter for each number
                        counters.forEach(counter => {
                            const animate = () => {
                                const value = +counter.getAttribute('data-target');
                                const data = +counter.innerText;
                                const time = value / speed;

                                if (data < value) {
                                    counter.innerText = Math.ceil(data + time);
                                    setTimeout(animate, 20);
                                } else {
                                    counter.innerText = value;
                                }
                            };
                            animate();
                        });

                        // Stop observing once animation has run
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 }); // Trigger when 30% visible

            statsObserver.observe(statsSection);
        });
    

    
        document.addEventListener('DOMContentLoaded', function () {
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.reveal-card');
                        cards.forEach(card => {
                            card.classList.remove('opacity-0', 'translate-y-10');
                            card.classList.add('opacity-100', 'translate-y-0');
                        });
                        // Stop observing after the animation has fired once
                        featureObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 }); // Triggers when 15% of the section is visible

            const targetSection = document.querySelector('#features-section');
            if (targetSection) featureObserver.observe(targetSection);
        });
    


    
        const slider = document.getElementById('features-slider');
        let isPaused = false;
        let isManualScrolling = false;
        let autoScrollSpeed = 0.8;

        // 1. Clone cards for infinite effect
        const cards = [...slider.children];
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            slider.appendChild(clone);
        });

        // 2. Enhanced Animation Loop
        function animate() {
            // Only auto-scroll if NOT paused AND NOT manually jumping
            if (!isPaused && !isManualScrolling) {
                slider.scrollLeft += autoScrollSpeed;

                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(animate);
        }

        // 3. FIXED Manual Button Navigation
        function moveSlider(direction) {
            // 1. Tell the auto-animator to stop 
            isManualScrolling = true;

            const scrollAmount = 400;
            const targetScroll = direction === 'left'
                ? slider.scrollLeft - scrollAmount
                : slider.scrollLeft + scrollAmount;

            // 2. Perform the smooth scroll
            slider.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            // 3. Resume auto-scroll after the smooth scroll finishes (approx 600ms)
            setTimeout(() => {
                isManualScrolling = false;

                // Loop check for manual clicks
                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                } else if (slider.scrollLeft <= 0) {
                    slider.scrollLeft = slider.scrollWidth / 2;
                }
            }, 600);
        }

        // 4. Interaction Listeners
        slider.addEventListener('mouseenter', () => isPaused = true);
        slider.addEventListener('mouseleave', () => isPaused = false);

        // Initialize
        requestAnimationFrame(animate);
    

    
        document.addEventListener('DOMContentLoaded', function () {
            const leaderObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const elements = entry.target.querySelectorAll('.reveal-leader');
                        elements.forEach(el => {
                            el.classList.remove('opacity-0', 'translate-y-10');
                            el.classList.add('opacity-100', 'translate-y-0');
                        });
                        leaderObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            const leaderSection = document.querySelector('#leadership-section');
            if (leaderSection) leaderObserver.observe(leaderSection);
        });
    

    
        document.addEventListener('DOMContentLoaded', function () {
            const admissionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const content = entry.target.querySelector('.reveal-admission');
                        content.classList.remove('opacity-0', 'translate-y-10', 'scale-95');
                        content.classList.add('opacity-100', 'translate-y-0', 'scale-100');

                        admissionObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            const admissionSection = document.querySelector('#admission');
            if (admissionSection) admissionObserver.observe(admissionSection);
        });
    

    
        document.addEventListener('DOMContentLoaded', function () {
            const observerOptions = {
                threshold: 0.15 // Trigger when 15% of the section is visible
            };

            const galleryObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Find all elements with 'reveal-gallery' inside this section
                        const revealElements = entry.target.querySelectorAll('.reveal-gallery');

                        revealElements.forEach(el => {
                            el.classList.remove('opacity-0', 'translate-y-10');
                            el.classList.add('opacity-100', 'translate-y-0');
                        });

                        // Stop observing once animation is done
                        galleryObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const target = document.querySelector('#campus-life');
            if (target) galleryObserver.observe(target);
        });
    

    
        document.addEventListener('DOMContentLoaded', function () {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImg');
            const closeModal = document.getElementById('closeModal');
            const galleryItems = document.querySelectorAll('.gallery-img');

            // 1. Popup Logic
            galleryItems.forEach(img => {
                // Trigger click on the image itself or its parent container
                img.parentElement.addEventListener('click', function () {
                    modal.classList.remove('hidden');
                    modalImg.src = img.src; // Set the large image source
                    document.body.style.overflow = 'hidden'; // Disable page scroll

                    setTimeout(() => {
                        modalImg.classList.remove('scale-95');
                        modalImg.classList.add('scale-100');
                    }, 10);
                });
            });

            // Close logic
            const closePopup = () => {
                modal.classList.add('hidden');
                modalImg.classList.add('scale-95');
                modalImg.classList.remove('scale-100');
                document.body.style.overflow = 'auto'; // Enable scroll
            };

            closeModal.addEventListener('click', closePopup);

            // Close on clicking the dark background
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    closePopup();
                }
            });
        });
    

    
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const title = document.getElementById('slider-title');
        const desc = document.getElementById('slider-desc');

        const content = [
            {
                t: "<span>Empowering Minds,</span><span class='text-primary mt-4 block'>Enriching Souls</span>",
                d: "Bell Matriculation Higher Secondary School provides a foundation of academic excellence combined with strong moral values."
            },
            {
                t: "<span>30 Years of</span><span class='text-primary mt-4 block'>Academic Excellence</span>",
                d: "Consistently producing state and district ranks through dedicated teaching and modern infrastructure."
            },
            {
                t: "<span>A Legacy of</span><span class='text-primary mt-4 block'>Holistic Growth</span>",
                d: "Nurturing talents in sports, arts, and character building to prepare students for the global stage."
            }
        ];

        let currentSlide = 0;

        function updateSlider(index) {
            // Reset Classes
            slides.forEach(s => s.style.opacity = '0');
            dots.forEach(d => d.classList.remove('active'));

            // Update Content
            slides[index].style.opacity = '1';
            dots[index].classList.add('active');

            // Text Animation Trigger
            title.classList.remove('hero-text-anim');
            desc.classList.remove('hero-text-anim');

            void title.offsetWidth; // Trigger reflow

            title.innerHTML = content[index].t;
            desc.innerText = content[index].d;

            title.classList.add('hero-text-anim');
            desc.classList.add('hero-text-anim');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider(currentSlide);
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider(currentSlide);
        }

        // Auto Play
        setInterval(nextSlide, 5000);

        // Initial Start
        updateSlider(0);
    

    
        
    

    
        // Set current year
        document.getElementById('current-year').textContent = new Date().getFullYear();





        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        mobileMenuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');

            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close mobile menu on click outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple cards in the same section
                    if (entry.target.classList.contains('feature-card') ||
                        entry.target.classList.contains('card-hover')) {
                        const cards = entry.target.parentElement.querySelectorAll('.feature-card, .card-hover');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate-in');
                            }, index * 100);
                        });
                    } else {
                        entry.target.classList.add('animate-in');
                    }

                    // Trigger counter animation if this element has counters
                    const counters = entry.target.querySelectorAll('.counter');
                    if (counters.length > 0) {
                        animateCounters(counters);
                    }

                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.addEventListener('DOMContentLoaded', () => {
            // Observe all sections
            const sections = document.querySelectorAll('section:not(:first-of-type)');
            sections.forEach(section => {
                observer.observe(section);
            });

            // Observe animated elements (excluding hero section)
            const animatedElements = document.querySelectorAll(
                'section:not(:first-of-type) .animate-fadeInUp, section:not(:first-of-type) .animate-slideInLeft, section:not(:first-of-type) .animate-slideInRight, section:not(:first-of-type) .animate-scaleIn, .feature-card, .card-hover'
            );
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        });

        // Counter animation with tracking
        const animatedCounters = new Set();

        const animateCounters = (counters) => {
            counters.forEach(counter => {
                if (animatedCounters.has(counter)) return;
                animatedCounters.add(counter);

                const target = parseInt(counter.getAttribute('data-target'));
                const speed = 200;
                const increment = target / speed;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 10);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        };
        

        // Back to top button
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('hidden');
            } else {
                backToTop.classList.add('hidden');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });



        
    

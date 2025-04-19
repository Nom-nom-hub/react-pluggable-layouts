document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Header scroll behavior
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.classList.add('hide');
        } else {
            // Scrolling up
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });

    // Code tabs
    const codeTabs = document.querySelectorAll('.code-tab');
    const codePanels = document.querySelectorAll('.code-panel');
    
    if (codeTabs.length && codePanels.length) {
        codeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                codeTabs.forEach(t => t.classList.remove('active'));
                codePanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to the clicked tab and corresponding panel
                tab.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    // Copy code buttons
    const copyButtons = document.querySelectorAll('.copy-code-button');
    
    if (copyButtons.length) {
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const codeBlock = button.previousElementSibling;
                const code = codeBlock.textContent;
                
                navigator.clipboard.writeText(code)
                    .then(() => {
                        // Indicate successful copy
                        const originalText = button.textContent;
                        button.textContent = 'Copied!';
                        button.classList.add('copied');
                        
                        // Reset after 2 seconds
                        setTimeout(() => {
                            button.textContent = originalText;
                            button.classList.remove('copied');
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy code: ', err);
                    });
            });
        });
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length) {
        // Initial check for elements in viewport
        checkAnimatedElements();
        
        // Check on scroll
        window.addEventListener('scroll', checkAnimatedElements);
        
        function checkAnimatedElements() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('animate');
                }
            });
        }
        
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
            );
        }
    }
}); 
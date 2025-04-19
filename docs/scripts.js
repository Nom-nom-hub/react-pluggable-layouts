document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.main-nav');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.classList.remove('active');
                }
            }
        });
    });
    
    // Code tabs functionality
    const codeTabs = document.querySelectorAll('.code-tab');
    const codePanels = document.querySelectorAll('.code-panel');
    
    if (codeTabs.length && codePanels.length) {
        codeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');
                
                // Remove active class from all tabs and panels
                codeTabs.forEach(t => t.classList.remove('active'));
                codePanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to current tab and panel
                tab.classList.add('active');
                document.querySelector(`.code-panel[data-id="${target}"]`).classList.add('active');
            });
        });
    }
    
    // Sticky header
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Feature card hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            featureCards.forEach(c => c.classList.remove('feature-focus'));
            card.classList.add('feature-focus');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('feature-focus');
        });
    });
    
    // Initialize code tabs
    if (codeTabs.length) {
        codeTabs[0].click();
    }
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Copy code functionality
    const copyButtons = document.querySelectorAll('.copy-code-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.parentElement.querySelector('code');
            const textToCopy = codeBlock.textContent;
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    button.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    });
}); 
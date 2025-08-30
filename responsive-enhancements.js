// Enhanced Responsive Design JavaScript for Connect Digitals

(function() {
  'use strict';

  // ===== RESPONSIVE UTILITIES =====
  
  // Debounce function for performance
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

  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ===== FORM ENHANCEMENTS =====

  // Enhanced form validation and responsiveness
  function enhanceForms() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea');
      const submitBtn = form.querySelector('.modern-submit-btn');
      
      // Add touch-friendly enhancements
      inputs.forEach(input => {
        // Prevent zoom on iOS for inputs
        if (input.type !== 'file') {
          input.style.fontSize = '16px';
        }
        
        // Enhanced focus handling
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          if (!this.value) {
            this.parentElement.classList.remove('focused');
          }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', debounce(function() {
          validateField(this);
        }, 300));
      });
      
      // Enhanced submit button behavior
      if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
          if (form.checkValidity()) {
            this.classList.add('loading');
            this.disabled = true;
          }
        });
      }
    });
  }

  // Enhanced field validation
  function validateField(field) {
    const wrapper = field.parentElement;
    const errorElement = wrapper.nextElementSibling;
    
    // Remove existing error states
    field.classList.remove('valid', 'invalid');
    wrapper.classList.remove('error');
    
    if (errorElement && errorElement.classList.contains('modern-error-message')) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
    
    // Validate based on field type
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    } else if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    // Apply validation state
    if (field.value) {
      field.classList.add(isValid ? 'valid' : 'invalid');
      wrapper.classList.toggle('error', !isValid);
      
      if (!isValid && errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
      }
    }
  }

  // ===== IMAGE ENHANCEMENTS =====

  // Enhanced image loading and responsiveness
  function enhanceImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Enhanced image loading
  function loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
    
    img.addEventListener('load', function() {
      this.classList.add('loaded');
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.style.opacity = '0.5';
      this.alt = 'Image failed to load';
    });
  }

  // ===== PORTFOLIO ENHANCEMENTS =====

  // Enhanced portfolio card interactions
  function enhancePortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
      // Touch-friendly interactions
      let touchStartY = 0;
      let touchEndY = 0;
      
      card.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      
      card.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleCardTouch(this, touchStartY, touchEndY);
      }, { passive: true });
      
      // Enhanced hover effects for non-touch devices
      if (window.matchMedia('(hover: hover)').matches) {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
        });
      }
    });
  }

  // Handle touch interactions for portfolio cards
  function handleCardTouch(card, startY, endY) {
    const touchDiff = startY - endY;
    const threshold = 50;
    
    if (Math.abs(touchDiff) > threshold) {
      // Simulate click for significant touch movement
      card.click();
    }
  }

  // ===== RESPONSIVE NAVIGATION ENHANCEMENTS =====

  // Enhanced mobile navigation
  function enhanceMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active', !isExpanded);
        body.classList.toggle('mobile-nav-open', !isExpanded);
        
        // Prevent body scroll when nav is open
        if (!isExpanded) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = '';
        }
      });
      
      // Close nav when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileNav.classList.remove('active');
          body.classList.remove('mobile-nav-open');
          body.style.overflow = '';
        }
      });
    }
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====

  // Optimize scroll performance
  function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScroll() {
      // Add scroll-based animations or effects here
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', throttle(requestTick, 16), { passive: true });
  }

  // ===== VIEWPORT AND ORIENTATION HANDLING =====

  // Handle viewport changes
  function handleViewportChanges() {
    const updateViewport = debounce(() => {
      // Update any viewport-dependent elements
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100);
    
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    
    // Initial call
    updateViewport();
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====

  // Enhanced keyboard navigation
  function enhanceKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        // Handle tab navigation
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // ===== INITIALIZATION =====

  // Initialize all enhancements when DOM is ready
  function init() {
    enhanceForms();
    enhanceImages();
    enhancePortfolioCards();
    enhanceMobileNavigation();
    optimizeScrollPerformance();
    handleViewportChanges();
    enhanceKeyboardNavigation();
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export functions for potential external use
  window.ConnectDigitalsResponsive = {
    enhanceForms,
    enhanceImages,
    enhancePortfolioCards,
    enhanceMobileNavigation,
    validateField,
    loadImage
  };

})();

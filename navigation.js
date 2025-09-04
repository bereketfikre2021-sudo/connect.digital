// New Navigation functionality
function initNavigation() {
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.new-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Check if required elements exist
  if (!mobileToggle || !mobileMenu) {
    console.warn('Mobile menu elements not found');
    return;
  }

  function toggleMobileMenu() {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', (!isExpanded).toString());
    mobileMenu.setAttribute('aria-hidden', isExpanded.toString());
    
    if (!isExpanded) {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  function closeMobileMenu() {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners for mobile menu
  mobileToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu when clicking outside
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  // Scroll to top functionality
  function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
      });

      // Smooth scroll to top when clicked
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Initialize scroll to top
  initScrollToTop();

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Animated Active Nav Link on Scroll
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').replace('#','');
    return document.getElementById(id);
  });
  
  function onScroll() {
    let scrollPos = window.scrollY + 120;
    let activeIndex = 0;
    sections.forEach((section, i) => {
      if (section && section.offsetTop <= scrollPos) {
        activeIndex = i;
      }
    });
    navLinks.forEach((link, i) => {
      if (i === activeIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', onScroll);
  onScroll(); // Initial call
}

// Hero background slideshow
function initHeroSlideshow() {
  console.log('initHeroSlideshow called');
  const heroElement = document.querySelector('.hero');
  console.log('Hero element found:', !!heroElement);
  
  if (heroElement) {
    const heroImages = ['img/BG.webp','img/BG-2.webp','img/BG-3.webp','img/BG-4.webp'];
    let currentImageIndex = 0;
    console.log('Hero images array:', heroImages);

    // Preload all hero images up-front to avoid blurry first-paint
    heroImages.forEach(src => { 
      const i = new Image(); 
      i.decoding = 'async'; 
      i.loading = 'eager'; 
      i.src = src; 
      console.log('Preloading image:', src);
    });

    function applyHeroImage(src) {
      console.log('Applying hero image:', src);
      heroElement.style.backgroundImage = `url('${src}')`;
      heroElement.style.backgroundSize = 'cover';
      heroElement.style.backgroundPosition = 'center';
      heroElement.style.imageRendering = 'auto';
      heroElement.style.webkitImageRendering = 'auto';
    }
    
    function changeHeroImage() {
      currentImageIndex = (currentImageIndex + 1) % heroImages.length;
      const nextImage = heroImages[currentImageIndex];
      console.log('Changing to image:', nextImage, 'index:', currentImageIndex);
      const img = new Image();
      img.decoding = 'async';
      img.onload = function() { 
        console.log('Image loaded:', nextImage);
        applyHeroImage(nextImage); 
      };
      img.src = nextImage;
    }
    
    // Set initial image explicitly to ensure crispness
    console.log('Setting initial image:', heroImages[0]);
    applyHeroImage(heroImages[0]);
    console.log('Starting slideshow interval (6 seconds)');
    setInterval(changeHeroImage, 6000);
  } else {
    console.warn('Hero element not found - slideshow not initialized');
  }
}

// Scroll to Top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });
    
    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}



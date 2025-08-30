// Compliance Badges Interactive Features for Connect Digitals

(function() {
  'use strict';

  // ===== COMPLIANCE BADGE ENHANCEMENTS =====

  // Initialize compliance badges
  function initComplianceBadges() {
    const badges = document.querySelectorAll('.compliance-badge');
    
    badges.forEach(badge => {
      // Add hover tooltips
      addTooltip(badge);
      
      // Add click tracking
      addClickTracking(badge);
      
      // Add focus enhancements
      addFocusEnhancements(badge);
      
      // Add animation triggers
      addAnimationTriggers(badge);
    });
  }

  // Add tooltip functionality
  function addTooltip(badge) {
    const tooltipData = {
      'gdpr-badge': {
        title: 'GDPR Compliant',
        description: 'We comply with the General Data Protection Regulation (GDPR) to protect your personal data and privacy rights.',
        icon: '✓'
      },
      'data-protection-badge': {
        title: 'Data Protection',
        description: 'Your personal information is encrypted and protected using industry-standard security measures.',
        icon: '🔒'
      },
      'privacy-shield-badge': {
        title: 'Privacy Shield',
        description: 'We respect your privacy and provide full control over your data and cookie preferences.',
        icon: '🛡️'
      },
      'secure-form-badge': {
        title: 'Secure Form',
        description: 'This form uses SSL encryption to ensure your data is transmitted securely.',
        icon: '🔐'
      }
    };

    const badgeClass = Array.from(badge.classList).find(cls => tooltipData[cls]);
    if (!badgeClass) return;

    const data = tooltipData[badgeClass];
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'compliance-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-header">
        <span class="tooltip-icon">${data.icon}</span>
        <span class="tooltip-title">${data.title}</span>
      </div>
      <div class="tooltip-content">${data.description}</div>
    `;
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 15, 51, 0.95);
      color: white;
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      max-width: 250px;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.3);
    `;

    // Add tooltip styles
    const tooltipStyles = document.createElement('style');
    tooltipStyles.textContent = `
      .compliance-tooltip .tooltip-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      
      .compliance-tooltip .tooltip-icon {
        font-size: 1rem;
      }
      
      .compliance-tooltip .tooltip-title {
        color: #D4AF37;
      }
      
      .compliance-tooltip .tooltip-content {
        line-height: 1.4;
        font-size: 0.75rem;
      }
      
      .compliance-tooltip.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(tooltipStyles);

    // Position tooltip relative to badge
    badge.style.position = 'relative';
    badge.appendChild(tooltip);

    // Show/hide tooltip on hover
    let timeout;
    
    badge.addEventListener('mouseenter', function() {
      clearTimeout(timeout);
      positionTooltip(tooltip, badge);
      tooltip.classList.add('show');
    });

    badge.addEventListener('mouseleave', function() {
      timeout = setTimeout(() => {
        tooltip.classList.remove('show');
      }, 100);
    });

    // Hide tooltip on focus out
    badge.addEventListener('focusout', function() {
      setTimeout(() => {
        if (!badge.contains(document.activeElement)) {
          tooltip.classList.remove('show');
        }
      }, 100);
    });
  }

  // Position tooltip
  function positionTooltip(tooltip, badge) {
    const badgeRect = badge.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position above the badge by default
    let top = badgeRect.top - tooltipRect.height - 10;
    let left = badgeRect.left + (badgeRect.width / 2) - (tooltipRect.width / 2);
    
    // Check if tooltip would go off screen
    if (top < 10) {
      // Position below if not enough space above
      top = badgeRect.bottom + 10;
    }
    
    if (left < 10) {
      left = 10;
    } else if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  // Add click tracking
  function addClickTracking(badge) {
    badge.addEventListener('click', function(e) {
      // Track compliance badge clicks for analytics
      const badgeType = Array.from(this.classList).find(cls => cls.includes('badge'));
      const badgeText = this.querySelector('.compliance-badge-text')?.textContent || 'Unknown';
      
      // Send analytics event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'compliance_badge_click', {
          'badge_type': badgeType,
          'badge_text': badgeText,
          'page_location': window.location.href
        });
      }
      
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  }

  // Add focus enhancements
  function addFocusEnhancements(badge) {
    badge.addEventListener('focus', function() {
      this.style.outline = '3px solid #D4AF37';
      this.style.outlineOffset = '2px';
    });

    badge.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  }

  // Add animation triggers
  function addAnimationTriggers(badge) {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    observer.observe(badge);
  }

  // ===== TRUST INDICATORS ENHANCEMENTS =====

  // Initialize trust indicators
  function initTrustIndicators() {
    const indicators = document.querySelectorAll('.trust-indicator');
    
    indicators.forEach(indicator => {
      // Add pulse animation on hover
      indicator.addEventListener('mouseenter', function() {
        this.style.animation = 'badgePulse 1s ease-in-out';
      });

      indicator.addEventListener('mouseleave', function() {
        this.style.animation = '';
      });
    });
  }

  // ===== COMPLIANCE NOTICE ENHANCEMENTS =====

  // Initialize compliance notice
  function initComplianceNotice() {
    const notices = document.querySelectorAll('.compliance-notice');
    
    notices.forEach(notice => {
      // Add expand/collapse functionality for mobile
      if (window.innerWidth <= 768) {
        addMobileExpand(notice);
      }
      
      // Add smooth scroll to policy links
      const policyLinks = notice.querySelectorAll('a[href*="policy"]');
      policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Add smooth scroll behavior
          this.style.transition = 'color 0.3s ease';
          setTimeout(() => {
            this.style.transition = '';
          }, 300);
        });
      });
    });
  }

  // Add mobile expand functionality
  function addMobileExpand(notice) {
    const content = notice.querySelector('p');
    const toggle = document.createElement('button');
    toggle.className = 'compliance-toggle';
    toggle.innerHTML = 'Read More';
    toggle.style.cssText = `
      background: none;
      border: none;
      color: #EC1C24;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.5rem;
      text-decoration: underline;
    `;

    // Initially hide content on mobile
    content.style.display = 'none';
    notice.appendChild(toggle);

    toggle.addEventListener('click', function() {
      if (content.style.display === 'none') {
        content.style.display = 'block';
        content.style.animation = 'fadeIn 0.3s ease';
        this.innerHTML = 'Read Less';
      } else {
        content.style.display = 'none';
        this.innerHTML = 'Read More';
      }
    });
  }

  // ===== RESPONSIVE HANDLING =====

  // Handle responsive behavior
  function handleResponsive() {
    const complianceBadges = document.querySelectorAll('.compliance-badges');
    
    complianceBadges.forEach(container => {
      // Adjust layout for mobile
      if (window.innerWidth <= 768) {
        container.style.flexDirection = 'column';
        container.style.gap = '0.75rem';
      } else {
        container.style.flexDirection = 'row';
        container.style.gap = '1rem';
      }
    });
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====

  // Enhance accessibility
  function enhanceAccessibility() {
    const badges = document.querySelectorAll('.compliance-badge');
    
    badges.forEach(badge => {
      // Add keyboard navigation
      badge.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
      
      // Add ARIA live region for screen readers
      if (!badge.getAttribute('aria-live')) {
        badge.setAttribute('aria-live', 'polite');
      }
    });
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====

  // Optimize performance
  function optimizePerformance() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResponsive, 100);
    });

    // Use passive event listeners where possible
    const badges = document.querySelectorAll('.compliance-badge');
    badges.forEach(badge => {
      badge.addEventListener('touchstart', function() {}, { passive: true });
      badge.addEventListener('touchend', function() {}, { passive: true });
    });
  }

  // ===== INITIALIZATION =====

  // Initialize all compliance features
  function init() {
    initComplianceBadges();
    initTrustIndicators();
    initComplianceNotice();
    enhanceAccessibility();
    optimizePerformance();
    handleResponsive();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export functions for potential external use
  window.ConnectDigitalsCompliance = {
    initComplianceBadges,
    initTrustIndicators,
    initComplianceNotice,
    enhanceAccessibility,
    handleResponsive
  };

})();

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initParallax();
  initSmoothScroll();
  initNavbar();
  initTypeCards();
  initProgressAnimation();
});

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        if (entry.target.classList.contains('feature-row')) {
          animateFeatureRow(entry.target);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-row, .fade-in, .section-intro, .type-card, .ai-feature-item').forEach(el => {
    observer.observe(el);
  });
}

function animateFeatureRow(row) {
  const cards = row.querySelectorAll('.stack-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
}

function initParallax() {
  const orbs = document.querySelectorAll('.gradient-orb');
  const phoneContainer = document.querySelector('.phone-container');
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
          const speed = 0.1 + (index * 0.05);
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        if (phoneContainer) {
          const heroHeight = document.querySelector('.hero').offsetHeight;
          const progress = Math.min(scrollY / heroHeight, 1);
          phoneContainer.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
          phoneContainer.style.opacity = 1 - (progress * 0.5);
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
          navbar.style.background = 'rgba(0, 0, 0, 0.92)';
        } else {
          navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

function initTypeCards() {
  const typeCards = document.querySelectorAll('.type-card');
  
  typeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `translateY(-12px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });
}

function initProgressAnimation() {
  const progressCircle = document.querySelector('.stat-progress');
  
  if (progressCircle) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressCircle.style.animation = 'progress 2s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(progressCircle);
  }
}

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(heroTitle);
}

const aiScanLine = document.querySelector('.ai-scan-line');
if (aiScanLine) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aiScanLine.style.animation = 'scan 2s linear infinite';
      } else {
        aiScanLine.style.animation = 'none';
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(aiScanLine);
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .hero-title {
    opacity: 0;
  }
`;
document.head.appendChild(style);

setTimeout(() => {
  if (heroTitle) {
    heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
  }
}, 300);

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  });
}

const detectBoxes = document.querySelectorAll('.ai-detect-box');
detectBoxes.forEach((box, index) => {
  box.style.opacity = '0';
  box.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    box.style.transition = 'all 0.5s ease-out';
    box.style.opacity = '1';
    box.style.transform = 'translateY(0)';
  }, 500 + (index * 300));
});

const statValue = document.querySelector('.stat-value');
if (statValue) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(statValue, 0, 128, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statValue);
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(easeOutQuart * (end - start) + start);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end;
    }
  }
  
  requestAnimationFrame(update);
}

const downloadSection = document.querySelector('.download');
if (downloadSection) {
  const downloadBg = downloadSection.querySelector('.download-bg');
  
  window.addEventListener('scroll', () => {
    const rect = downloadSection.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
    
    if (downloadBg) {
      const orbs = downloadBg.querySelectorAll('.gradient-orb');
      orbs.forEach((orb, index) => {
        orb.style.transform = `translateY(${progress * 50 * (index + 1)}px)`;
      });
    }
  });
}

// ==================== //
// Scroll Reveal Animation
// ==================== //

const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100; // Reduced threshold
    const windowHeight = window.innerHeight;

    // Trigger if element is visible OR if we've reached the bottom of the page
    if (elementTop < windowHeight - elementVisible ||
      (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      element.classList.add('active');
    }
  });
};

// Initial check
revealElements();

// Check on scroll
window.addEventListener('scroll', revealElements);

// ==================== //
// Smooth Scroll for Links
// ==================== //

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

// ==================== //
// Parallax Effect for Floating Orbs
// ==================== //

const parallaxOrbs = () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll('.floating-orb');

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.3;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
};

window.addEventListener('scroll', parallaxOrbs);

// ==================== //
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ==================== //

const createTypingEffect = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = '';

  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  };

  typeWriter();
};

// Uncomment to enable typing effect
// const subtitle = document.querySelector('.hero-subtitle');
// const originalText = subtitle.textContent;
// createTypingEffect(subtitle, originalText, 80);

// ==================== //
// Interactive Stat Cards
// ==================== //

const animateStatNumbers = () => {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const text = stat.textContent.trim();
    const hasNumber = /\d/.test(text);

    if (hasNumber && !stat.classList.contains('animated')) {
      const numberMatch = text.match(/\d+/);
      if (numberMatch) {
        const targetNumber = parseInt(numberMatch[0]);
        const prefix = text.substring(0, text.indexOf(numberMatch[0]));
        const suffix = text.substring(text.indexOf(numberMatch[0]) + numberMatch[0].length);

        let currentNumber = 0;
        const increment = targetNumber / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(counter);
          }
          stat.textContent = prefix + Math.floor(currentNumber) + suffix;
        }, stepTime);

        stat.classList.add('animated');
      }
    }
  });
};

// Trigger animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStatNumbers();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

// ==================== //
// Timeline Item Stagger Animation
// ==================== //

const staggerTimelineItems = () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });
};

staggerTimelineItems();

// ==================== //
// Cursor Trail Effect (Optional Premium Touch)
// ==================== //

const createCursorTrail = () => {
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll('.cursor-circle');

  if (circles.length === 0) return;

  circles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
  });

  window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  const animateCircles = () => {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      circle.style.left = x - 12 + 'px';
      circle.style.top = y - 12 + 'px';
      circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  };

  animateCircles();
};

// Uncomment to enable cursor trail
// createCursorTrail();

// ==================== //
// Console Easter Egg
// ==================== //

console.log('%c👋 Hello, Developer!', 'font-size: 20px; color: #4c9aff; font-weight: bold;');
console.log('%cInterested in AI research and collaboration? Let\'s connect!', 'font-size: 14px; color: #00d4ff;');
console.log('%c🎓 Google Scholar: https://scholar.google.co.in/citations?user=yG10EJMAAAAJ&hl=en', 'font-size: 12px; color: #a370ff;');

// ==================== //
// Performance Monitoring
// ==================== //

window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
  }
});

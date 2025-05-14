// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }
    
    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          
          // Reset icon
          const icon = mobileMenuBtn.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        // Don't scroll if it's just "#"
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Get the height of the fixed header
          const headerHeight = document.querySelector('header').offsetHeight;
          
          // Calculate the position to scroll to
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top-btn';
    scrollToTopBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--primary);
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
      }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.feature-card, .step-card, .benefit-item, .testimonial-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
          element.style.animationPlayState = 'running';
        }
      });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form validation for contact form if exists
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
          if (input.value.trim() === '') {
            valid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        });
        
        if (valid) {
          // Here you would normally submit the form or send data via AJAX
          // For demo purposes, just show success message
          const successMessage = document.createElement('div');
          successMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
          successMessage.className = 'success-message';
          successMessage.style.cssText = `
            background-color: var(--primary-light);
            color: var(--primary-dark);
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            text-align: center;
          `;
          
          contactForm.appendChild(successMessage);
          contactForm.reset();
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }
      });
    }
    
    // Countdown for app launch if exists
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
      // Set launch date - example: 3 months from now
      const launchDate = new Date();
      launchDate.setMonth(launchDate.getMonth() + 3);
      
      const updateCountdown = function() {
        const currentDate = new Date();
        const difference = launchDate - currentDate;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update countdown element
        countdownElement.innerHTML = `
          <div class="countdown-item">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Días</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Horas</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Minutos</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Segundos</span>
          </div>
        `;
      };
      
      // Initial update
      updateCountdown();
      
      // Update every second
      setInterval(updateCountdown, 1000);
    }
  });
/* ==========================================================================
   CHULPAKANQI — LUXURY INTERACTION LOGIC (GSAP, LENIS & NATIVE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Lenis Smooth Scroll Initialization
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean inertia curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.05,
  });

  // RAF loop for Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Synchronize Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Hero Section Page-Entry Timeline
  const entryTL = gsap.timeline({ defaults: { ease: "power4.out" } });

  entryTL.to(".hero-image", {
    scale: 1,
    duration: 2.2,
  })
  .to(".hero-eyebrow", {
    opacity: 1,
    y: 0,
    duration: 1,
  }, "-=1.8")
  .to(".hero-title", {
    opacity: 1,
    y: 0,
    duration: 1.2,
  }, "-=1.6")
  .to(".hero-description", {
    opacity: 1,
    y: 0,
    duration: 1,
  }, "-=1.4")
  .to(".hero-cta-group", {
    opacity: 1,
    y: 0,
    duration: 1,
  }, "-=1.2")
  .to(".nav-inner", {
    y: 0,
    opacity: 1,
    duration: 1,
  }, "-=1.0");

  // 3. ScrollTrigger Reveals — Image Scaling Scroll
  // As cards enter the viewport, their image zooms slightly and text reveals
  const bentoCards = document.querySelectorAll(".bento-card");
  
  bentoCards.forEach((card) => {
    const img = card.querySelector(".bento-card-image");
    if (!img) return;

    gsap.fromTo(img, {
      scale: 1.12,
    }, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });

  // 4. Scrubbing Word-by-Word Text Reveal (Narrative)
  const textScrubEl = document.getElementById("scroll-scrub-text");
  if (textScrubEl) {
    const rawText = textScrubEl.textContent.trim();
    const words = rawText.split(/\s+/);
    
    // Wrap each word in a span for individual scrub control
    textScrubEl.innerHTML = words
      .map(word => `<span class="scrub-word" style="display: inline-block; opacity: 0.15;">${word}</span>`)
      .join(" ");

    gsap.to(".scrub-word", {
      opacity: 1,
      stagger: 0.03,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".narrative-section",
        start: "top 78%",
        end: "bottom 55%",
        scrub: 1.2,
      }
    });
  }

  // 5. Curated Testimonials Slider
  const slides = document.querySelectorAll(".testimonial-card");
  const currentSlideIndicator = document.getElementById("current-slide");
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");
  let activeIndex = 0;

  if (slides.length > 0 && prevBtn && nextBtn) {
    
    function switchTestimonial(newIndex) {
      if (newIndex === activeIndex) return;

      const currentSlide = slides[activeIndex];
      const nextSlide = slides[newIndex];

      // Disable buttons temporarily to prevent quick click bugs
      prevBtn.disabled = true;
      nextBtn.disabled = true;

      // Animate current out
      gsap.to(currentSlide, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        onComplete: () => {
          currentSlide.classList.remove("active");
          currentSlide.style.position = "absolute";

          // Set next starting state
          nextSlide.classList.add("active");
          nextSlide.style.position = "relative";
          
          // Animate next in
          gsap.fromTo(nextSlide, {
            opacity: 0,
            y: 15,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => {
              activeIndex = newIndex;
              currentSlideIndicator.textContent = activeIndex + 1;
              prevBtn.disabled = false;
              nextBtn.disabled = false;
            }
          });
        }
      });
    }

    prevBtn.addEventListener("click", () => {
      let target = activeIndex - 1;
      if (target < 0) target = slides.length - 1;
      switchTestimonial(target);
    });

    nextBtn.addEventListener("click", () => {
      let target = activeIndex + 1;
      if (target >= slides.length) target = 0;
      switchTestimonial(target);
    });
  }

  // 6. Interactive FAQ Accordion Trigger
  const faqTriggers = document.querySelectorAll(".faq-trigger");

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const parent = trigger.parentElement;
      const content = parent.querySelector(".faq-content");
      const icon = trigger.querySelector(".faq-icon");
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other accordions for luxury editorial feel (single focus)
      faqTriggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          const otherParent = otherTrigger.parentElement;
          const otherContent = otherParent.querySelector(".faq-content");
          const otherIcon = otherTrigger.querySelector(".faq-icon");
          
          otherTrigger.setAttribute("aria-expanded", "false");
          otherParent.classList.remove("active");
          gsap.to(otherContent, { maxHeight: 0, duration: 0.4, ease: "power2.out" });
        }
      });

      // Toggle current
      if (isExpanded) {
        trigger.setAttribute("aria-expanded", "false");
        parent.classList.remove("active");
        gsap.to(content, { maxHeight: 0, duration: 0.4, ease: "power2.out" });
      } else {
        trigger.setAttribute("aria-expanded", "true");
        parent.classList.add("active");
        gsap.to(content, { 
          maxHeight: content.scrollHeight + 32, // Add buffer padding space
          duration: 0.5, 
          ease: "power3.out" 
        });
      }
    });
  });

  // 7. Secure Booking Form Handling & Validation
  const form = document.getElementById("reservation-gateway-form");
  const successState = document.getElementById("form-success-message");

  if (form && successState) {
    
    // Real-time error clearance
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        const group = input.closest(".form-group");
        if (group && group.classList.contains("has-error")) {
          group.classList.remove("has-error");
          input.classList.remove("invalid");
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let hasErrors = false;
      
      const nameInput = document.getElementById("form-name");
      const emailInput = document.getElementById("form-email");
      const arrivalInput = document.getElementById("form-arrival");
      const departureInput = document.getElementById("form-departure");

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput);
        hasErrors = true;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        showError(emailInput);
        hasErrors = true;
      }

      // Validate Arrival
      if (!arrivalInput.value) {
        showError(arrivalInput);
        hasErrors = true;
      }

      // Validate Departure
      if (!departureInput.value) {
        showError(departureInput);
        hasErrors = true;
      }

      if (hasErrors) return;

      // Simulated luxury submission state
      const submitBtn = document.getElementById("form-submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Verifying Estate Allocation...";

      // Smooth delay representing curated hospitality check
      setTimeout(() => {
        gsap.to(form, {
          opacity: 0,
          y: -15,
          duration: 0.4,
          onComplete: () => {
            form.style.display = "none";
            successState.style.display = "block";
            successState.setAttribute("aria-hidden", "false");
            
            // Re-enable scroll trigger recalculations for footer height changes
            ScrollTrigger.refresh();
          }
        });
      }, 1500);
    });
  }

  function showError(inputElement) {
    const group = inputElement.closest(".form-group");
    if (group) {
      group.classList.add("has-error");
      inputElement.classList.add("invalid");
    }
  }


  // 8. Bento Grid Amenities Interactive Slider
  const bentoSlides = document.querySelectorAll("#bento-card-amenities-slider .bento-slide");
  const bentoDots = document.querySelectorAll("#bento-card-amenities-slider .slider-dot");
  let bentoActiveIndex = 0;
  let bentoSliderInterval;

  if (bentoSlides.length > 0 && bentoDots.length > 0) {
    function switchBentoSlide(newIndex) {
      if (newIndex === bentoActiveIndex) return;

      const currentSlide = bentoSlides[bentoActiveIndex];
      const nextSlide = bentoSlides[newIndex];

      // Deactivate current slide and dot
      currentSlide.classList.remove("active");
      bentoDots[bentoActiveIndex].classList.remove("active");

      // Activate next slide and dot
      nextSlide.classList.add("active");
      bentoDots[newIndex].classList.add("active");

      // Premium vertical text reveal stagger using GSAP
      const nextTextElements = nextSlide.querySelectorAll(".card-eyebrow, .card-title, .card-text");
      gsap.fromTo(nextTextElements, {
        opacity: 0,
        y: 12,
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out"
      });

      bentoActiveIndex = newIndex;
    }

    function startBentoAutoplay() {
      stopBentoAutoplay();
      bentoSliderInterval = setInterval(() => {
        let nextIndex = (bentoActiveIndex + 1) % bentoSlides.length;
        switchBentoSlide(nextIndex);
      }, 5000);
    }

    function stopBentoAutoplay() {
      if (bentoSliderInterval) {
        clearInterval(bentoSliderInterval);
      }
    }

    // Attach dot click interaction
    bentoDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopBentoAutoplay();
        switchBentoSlide(index);
        startBentoAutoplay();
      });
    });

    startBentoAutoplay();
  }

  // Smooth link transitions managed by Lenis
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -80, // Offset for navbar spacing
          duration: 1.5,
          immediate: false,
        });
      }
    });
  });

});


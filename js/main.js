document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

  // Initialize animations (skip heavy motion if user prefers reduced motion)
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (!prefersReducedMotion) {
    initializeAnimations();
    initializeScrollTriggers();
  }
  // Always bind interaction handlers
  initializeInteractions();

  // Dynamic footer year
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /**
   * Initialize basic animations that run on page load
   */
  function initializeAnimations() {
    // Navbar animation
    gsap.from(".navbar-brand", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".navbar-nav .nav-item", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.7,
      ease: "back.out(1.7)",
    });

    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl
      .from(".hero__title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        ".hero__subtitle",
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        ".hero__cta",
        {
          opacity: 0,
          scale: 0.8, // Start slightly smaller
          duration: 0.8,
          ease: "back.out(1.7)",
          immediateRender: false, // Ensures it only animates once
        },
        "-=0.4"
      );
  }

  /**
   * Set up all ScrollTrigger animations
   */
  function initializeScrollTriggers() {
    // Parallax effect for hero section
    gsap.to(".hero", {
      backgroundPosition: "50% 0%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Navbar background change on scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top -80px",
      onEnter: () =>
        gsap.to(".navbar", {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "8px 0",
          duration: 0.3,
        }),
      onLeaveBack: () =>
        gsap.to(".navbar", {
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: "16px 0",
          duration: 0.3,
        }),
    });

    // Services section cards
    gsap.from("#services .card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
      },
    });

    // Before & After section
    const beforeAfterTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#before-after",
        start: "top 70%",
      },
    });

    beforeAfterTl
      .from("#before-after h2", {
        opacity: 0,
        y: 30,
        duration: 0.7,
      })
      .from(
        "#before-after p",
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
        },
        "-=0.4"
      )
      .from(
        "#before-after .btn",
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
        },
        "-=0.4"
      );

    // Create a subtle shine effect across the image
    gsap.to(".before-after__image-wrapper::after", {
      x: "100%",
      repeat: -1,
      duration: 3,
      ease: "power1.inOut",
      repeatDelay: 2,
    });

    // Why Us Cards with 3D rotation
    gsap.from(".why-us__card", {
      opacity: 0,
      rotationY: 30,
      transformOrigin: "left center",
      stagger: 0.2,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#why-us",
        start: "top 70%",
      },
    });

    // Counters animation
    const counterElements = document.querySelectorAll(".counter-value");
    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      gsap.to(counter, {
        innerText: target,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
        },
      });
    });

    // How It Works steps animation
    gsap.from(".step", {
      opacity: 0,
      x: -50,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#how-it-works",
        start: "top 70%",
      },
    });

    // Step numbers pulse animation
    gsap.to(".step__icon", {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#how-it-works",
        start: "top 70%",
      },
    });

    // Contact form animation
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
      },
    });

    contactTl
      .from("#contact h2", {
        opacity: 0,
        y: 20,
        duration: 0.7,
      })
      .from(
        "#contact form .form-control",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power1.out",
        },
        "-=0.3"
      )
      .from(
        "#contact form button",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      );
  }

  /**
   * Set up interactive animations (hover effects, clicks, etc.)
   */
  function initializeInteractions() {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId !== "#") {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetId,
              offsetY: 80,
            },
            ease: "power3.inOut",
          });

          // If mobile menu is open, close it
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            document.querySelector(".navbar-toggler").click();
          }
        }
      });
    });

    // Plan card hover animations
    const planCards = document.querySelectorAll(".plan-card");
    planCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (!card.classList.contains("plan-card--highlight")) {
          gsap.to(card, {
            y: -10,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            duration: 0.3,
            ease: "power1.out",
          });
        } else {
          gsap.to(card, {
            y: -10,
            scale: 1.08,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
            ease: "power1.out",
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        if (!card.classList.contains("plan-card--highlight")) {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power1.out",
          });
        } else {
          gsap.to(card, {
            y: 0,
            scale: 1.05,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
            duration: 0.3,
            ease: "power1.out",
          });
        }
      });
    });

    // Add form submission handling
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Animate button
        const button = this.querySelector('button[type="submit"]');
        button.innerHTML =
          '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        button.disabled = true;

        // Simulate form submission
        gsap.to(contactForm.elements, {
          opacity: 0.5,
          duration: 0.3,
        });

        setTimeout(() => {
          // Success animation
          gsap.to(contactForm, {
            height: contactForm.offsetHeight,
            duration: 0,
          });

          const successMessage = document.createElement("div");
          successMessage.className = "text-center success-message";
          successMessage.innerHTML =
            '<i class="bi bi-check-circle-fill success-icon"></i><h4>Thank you!</h4><p>We\'ll be in touch soon.</p>';

          // Hide form and show success
          gsap.to(contactForm, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              contactForm.innerHTML = "";
              contactForm.appendChild(successMessage);
              gsap.from(successMessage, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "back.out(1.7)",
              });
              gsap.to(contactForm, {
                opacity: 1,
                duration: 0.5,
              });
            },
          });
        }, 1500);
      });
    }

    // Create a scroll progress indicator
    createScrollIndicator();
  }

  /**
   * Creates a scroll progress indicator at the top of the page
   */
  function createScrollIndicator() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress-bar";
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        scrub: 0.3,
      },
    });
  }
});

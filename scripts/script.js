document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
  initNavbarScroll();
  initSmoothScroll();
  setCurrentYear();
});

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-aos-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("aos-animate");
        }, parseInt(delay));
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el);
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 60;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function openPdfViewer(pdfUrl) {
  const modal = document.getElementById("pdf-viewer");
  const iframe = document.getElementById("pdf-iframe");

  if (modal && iframe) {
    iframe.src = pdfUrl;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closePdfViewer() {
  const modal = document.getElementById("pdf-viewer");
  const iframe = document.getElementById("pdf-iframe");

  if (modal && iframe) {
    modal.classList.remove("active");
    iframe.src = "";
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePdfViewer();
  }
});

document.getElementById("pdf-viewer")?.addEventListener("click", function (e) {
  if (e.target === this) {
    closePdfViewer();
  }
});

window.openPdfViewer = openPdfViewer;
window.closePdfViewer = closePdfViewer;

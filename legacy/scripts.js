document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  if (nav && !document.querySelector(".theme-toggle")) {
    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    const setLabel = () => toggle.textContent = document.body.classList.contains("light-mode") ? "Dark" : "Light";
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
      setLabel();
    });
    nav.appendChild(toggle);
    if (localStorage.getItem("theme") === "light") document.body.classList.add("light-mode");
    setLabel();
  }

  const openModal = (modal) => { if (modal) modal.style.display = "block"; };
  const closeModal = (modal) => { if (modal) modal.style.display = "none"; };

  document.querySelectorAll('.modal-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(document.getElementById(trigger.dataset.modal)));
  });

  document.querySelectorAll('.modal .close').forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.modal')));
  });

  document.querySelectorAll('a[href="#contact-modal"]').forEach((link) => {
    link.addEventListener('click', (e) => { e.preventDefault(); openModal(document.getElementById('contact-modal')); });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList && event.target.classList.contains('modal')) closeModal(event.target);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(closeModal);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.panel, .project-card, .hero-content, .skill-card, .cert-card, .experience-card, .education-card').forEach((el) => observer.observe(el));

  const form = document.getElementById("contact-form");
  if (form && typeof emailjs !== "undefined") {
    emailjs.init("d5p16jvVsbmTRVJyk");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      emailjs.sendForm("service_se211gh", "template_1ptonjd", this, "d5p16jvVsbmTRVJyk")
        .then(() => {
          alert("Message sent successfully!");
          this.reset();
          closeModal(document.getElementById("contact-modal"));
        })
        .catch(() => alert("Failed to send message. Please try again later."));
    });
  }

  const bars = Array.from(document.querySelectorAll('.progress'));
  if (bars.length) {
    const widths = [90, 60, 75, 60, 75];
    bars.forEach((bar, i) => { bar.style.width = '0%'; setTimeout(() => bar.style.width = `${widths[i] ?? 60}%`, 120); });
  }
});

// Contact Form Modal Handling
document.addEventListener("DOMContentLoaded", () => {
    if (typeof emailjs !== "undefined") {
        emailjs.init("d5p16jvVsbmTRVJyk"); // Initialize EmailJS
    } else {
        console.error("EmailJS failed to load.");
    }

    const contactModal = document.getElementById("contact-modal");
    const contactLinks = document.querySelectorAll('a[href="#contact-modal"]');
    contactLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            contactModal.style.display = "block";
        });
    });

    const closeModalBtn = contactModal.querySelector(".close");
    closeModalBtn.addEventListener("click", () => {
        contactModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === contactModal) {
            contactModal.style.display = "none";
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal").forEach(modal => {
                modal.style.display = "none";
            });
        }
    });

    // Unified Modal Handling for Certification and Experience Cards
    document.querySelectorAll(".modal-trigger").forEach(card => {
        card.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = "block";
                }
            }
        });
    });

    document.querySelectorAll(".modal .close").forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        document.querySelectorAll(".modal").forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Scroll-triggered fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.panel, .project-card, .hero-content').forEach(el => {
        observer.observe(el);
    });
});

// Highlight nav button based on scroll position
let scrollTimeout;
document.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav button');

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 50 && rect.bottom >= 50) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }, 100);
});

// Smooth scroll for nav buttons
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', (event) => {
        const target = event.target.getAttribute('onclick').split("'")[1].replace('.html', '');
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Section with ID '${target}' not found.`);
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Progress bar animation
window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.progress');
    const proficiencyLevels = [90, 60, 75, 60, 75]; // Cybersecurity, DevSecOps, Cloud Security, Python, Stakeholder Management

    if (progressBars.length !== proficiencyLevels.length) {
        console.warn("Mismatch between progress bars and proficiency levels");
    }

    progressBars.forEach((bar, index) => {
        bar.style.width = '0%'; // Reset width before animation
        setTimeout(() => {
            bar.style.width = proficiencyLevels[index] + '%';
        }, 100);
    });
});

// EmailJS Integration for Contact Form
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    console.log("Send button clicked! Form is submitting..."); // Debugging log

    if (typeof emailjs !== "undefined") {
        emailjs.sendForm("service_se211gh", "template_1ptonjd", this, "d5p16jvVsbmTRVJyk")
            .then(response => {
                alert("Message sent successfully!");
                document.getElementById("contact-form").reset();
                const modal = document.getElementById("contact-modal");
                if (modal) modal.style.display = "none"; // Close modal on success
            })
            .catch(error => {
                console.error("EmailJS Error:", error);
                alert("Failed to send message. Please try again later.");
            });
    } else {
        console.error("EmailJS is not loaded. Unable to send message.");
        alert("There was an issue sending your message. Please try again later.");
    }
});

// Contact Form Modal Handling
document.addEventListener("DOMContentLoaded", () => {
    if (typeof emailjs !== "undefined") {
        emailjs.init("d5p16jvVsbmTRVJyk"); // Initialize EmailJS
    } else {
        console.error("EmailJS failed to load.");
    }

    const contactBtn = document.getElementById("contact-btn");
    const contactModal = document.getElementById("contact-modal");

    if (contactBtn && contactModal) {
        const closeModalBtn = contactModal.querySelector(".close");

        contactBtn.addEventListener("click", () => {
            contactModal.style.display = "block";
        });

        closeModalBtn.addEventListener("click", () => {
            contactModal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === contactModal) {
                contactModal.style.display = "none";
            }
        });
    }

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
});

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

window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.progress');
    const proficiencyLevels = [90, 80, 85, 75]; // Add proficiency levels for each skill

    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = proficiencyLevels[index] + '%';
        }, 500); // Add delay to make the animation smoother
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
                contactModal.style.display = "none"; // Close modal on success
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

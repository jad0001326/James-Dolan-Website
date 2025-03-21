// Open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
};

// Contact Form Modal Handling
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("d5p16jvVsbmTRVJyk"); // Initialize EmailJS with your Public Key

    const contactBtn = document.getElementById("contact-btn");
    const contactModal = document.getElementById("contact-modal");
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
});

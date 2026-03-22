const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("nav-list");
const themeBtn = document.getElementById("theme-toggle");
const toast = document.getElementById("toast");



function showToast(message, type = "info") {

    if (!toast) return;

    toast.textContent = message;
    toast.className = "toast " + type + " show";

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            showToast("Please fill all fields", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            showToast("Enter a valid email", "error");
            return;
        }

        sendBtn.disabled = true;
        sendBtn.textContent = "Sending...";

        try {

            await emailjs.send(
                "service_5dh9ivn",
                "template_ofqj74g",
                {
                    from_name: name,
                    from_email: email,
                    message: message
                }
            );

            showToast("Message sent successfully", "success");
            form.reset();

        } catch (error) {

            showToast("Message failed to send", "error");

        }

        sendBtn.disabled = false;
        sendBtn.textContent = "Submit";

    });

}

if (hamburger && navList) {

    hamburger.addEventListener("click", function () {

        hamburger.classList.toggle("is-open");
        navList.classList.toggle("is-open");

    });

}


if (themeBtn) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("light-theme");

        const theme =
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem("theme", theme);

    });

}

const revealElements = document.querySelectorAll(
    ".reveal, .skill-card, .box, .service-card, .contact-card, .phone"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }

    });

}, { threshold: 0.2 });


revealElements.forEach((el) => {
    observer.observe(el);
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#nav-list a");

window.addEventListener("scroll", function () {

    let scrollPos = window.scrollY + 150;

    sections.forEach((section) => {

        if (scrollPos >= section.offsetTop) {

            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(
                '#nav-list a[href="#' + section.id + '"]'
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

});
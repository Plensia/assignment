document.addEventListener('DOMContentLoaded', () => {
    // greetUser function for time-based greeting
    function greetUser() {
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            const hour = new Date().getHours();
            let greeting;
            if (hour < 12) {
                greeting = 'Good Morning!';
            } else if (hour < 18) {
                greeting = 'Good Afternoon!';
            } else {
                greeting = 'Good Evening!';
            }
            greetingElement.textContent = greeting;
            greetingElement.setAttribute('aria-live', 'polite');
        }
    }

    // Run greetUser on page load
    greetUser();

    // Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        });

        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggleBtn.setAttribute('aria-pressed', 'true');
        }
    }

    // Hamburger Menu for Mobile
    const nav = document.querySelector('.vertical-nav');
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.prepend(hamburger);

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        const isOpen = nav.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        hamburger.classList.toggle('open');
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.vertical-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('open');
        });
    });

    // Ensure keyboard navigation for nav links
    navLinks.forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
});
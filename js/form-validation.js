document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset error messages
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.textContent = '';
            });

            // Name validation
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('name-error').textContent = 'Name is required';
                name.setAttribute('aria-invalid', 'true');
                alert('Name is required');
                isValid = false;
            } else {
                name.setAttribute('aria-invalid', 'false');
            }

            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!email.value.trim()) {
                document.getElementById('email-error').textContent = 'Email is required';
                email.setAttribute('aria-invalid', 'true');
                alert('Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                email.setAttribute('aria-invalid', 'true');
                alert('Please enter a valid email');
                isValid = false;
            } else {
                email.setAttribute('aria-invalid', 'false');
            }

            // Phone validation (optional)
            const phone = document.getElementById('phone');
            const phoneRegex = /^\d{10}$/;
            if (phone.value.trim() && !phoneRegex.test(phone.value.trim())) {
                document.getElementById('phone-error').textContent = 'Please enter a valid 10-digit phone number';
                phone.setAttribute('aria-invalid', 'true');
                alert('Please enter a valid 10-digit phone number');
                isValid = false;
            } else {
                phone.setAttribute('aria-invalid', 'false');
            }

            // Message validation
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                document.getElementById('message-error').textContent = 'Message is required';
                message.setAttribute('aria-invalid', 'true');
                alert('Message is required');
                isValid = false;
            } else {
                message.setAttribute('aria-invalid', 'false');
            }

            // Show success message if valid
            if (isValid) {
                successMessage.classList.remove('hidden');
                successMessage.setAttribute('aria-live', 'polite');
                contactForm.reset();
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }
        });

        // Add focus and blur event listeners for rosy highlight
        ['name', 'email', 'phone', 'message'].forEach(id => {
            const input = document.getElementById(id);
            input.addEventListener('focus', () => {
                input.style.borderColor = '#FF6B6B'; // Rosy color
                input.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.style.borderColor = 'var(--color-border)';
                input.classList.remove('focused');
            });
        });
    }
});
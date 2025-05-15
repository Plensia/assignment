document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('survey-form');
    if (!surveyForm) return;
    
    const formElements = {
        foundThroughError: document.getElementById('foundThrough-error'),
        interestedSkillsError: document.getElementById('interestedSkills-error'),
        successMessage: document.getElementById('survey-success-message')
    };
    
    // Helper function to get selected radio value
    const getSelectedRadioValue = (name) => {
        const radio = document.querySelector(`input[name="${name}"]:checked`);
        return radio ? radio.value : null;
    };
    
    // Helper function to get selected checkboxes values
    const getSelectedCheckboxValues = (name) => {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    };
    
    // Form submission
    surveyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Reset errors
        [formElements.foundThroughError, formElements.interestedSkillsError]
            .forEach(elem => {
                if (elem) elem.textContent = '';
            });
        
        // Validate referral source (radio buttons)
        const foundThrough = getSelectedRadioValue('foundThrough');
        if (!foundThrough) {
            formElements.foundThroughError.textContent = 'Please select how you found this site';
            isValid = false;
        }
        
        // Validate skills (checkboxes)
        const interestedSkills = getSelectedCheckboxValues('interestedSkills');
        if (interestedSkills.length === 0) {
            formElements.interestedSkillsError.textContent = 'Please select at least one skill you\'re interested in';
            isValid = false;
        }
        
        if (isValid) {
            // In a real app, you would submit the form data to a server
            const feedback = document.getElementById('feedback').value;
            
            console.log('Survey submitted:', {
                foundThrough,
                interestedSkills,
                feedback
            });
            
            // Replace form with success message
            surveyForm.style.display = 'none';
            formElements.successMessage.classList.remove('hidden');
            
            // Reset and show form after 5 seconds
            setTimeout(() => {
                surveyForm.reset();
                surveyForm.style.display = 'block';
                formElements.successMessage.classList.add('hidden');
            }, 5000);
        } else {
            // Show alert for invalid inputs
            alert('Please complete all required fields in the survey.');
        }
    });
    
    // Enhance the form inputs with visual feedback
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Add visual indicator when an option is selected
    [...radioButtons, ...checkboxes].forEach(input => {
        const label = input.nextElementSibling;
        
        // Ensure inputs are keyboard accessible
        input.setAttribute('tabindex', '0');
        
        input.addEventListener('change', function() {
            if (this.checked) {
                if (this.type === 'radio') {
                    // Remove active class from all radio labels in the same group
                    document.querySelectorAll(`input[name="${this.name}"] + label`)
                        .forEach(lbl => lbl.classList.remove('active'));
                }
                
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
            
            // Clear validation errors when options are selected
            if (this.name === 'foundThrough' && formElements.foundThroughError) {
                formElements.foundThroughError.textContent = '';
            }
            
            if (this.name === 'interestedSkills' && formElements.interestedSkillsError) {
                // Only clear error if at least one checkbox is checked
                if (getSelectedCheckboxValues('interestedSkills').length > 0) {
                    formElements.interestedSkillsError.textContent = '';
                }
            }
        });
        
        // Add focus styles for keyboard navigation
        input.addEventListener('focus', function() {
            label.classList.add('focus-visible');
        });
        
        input.addEventListener('blur', function() {
            label.classList.remove('focus-visible');
        });
    });
    
    // Make the feedback textarea highlight on focus
    const feedbackTextarea = document.getElementById('feedback');
    if (feedbackTextarea) {
        feedbackTextarea.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 0 2px rgba(30, 184, 184, 0.2)';
        });
        
        feedbackTextarea.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    }
});
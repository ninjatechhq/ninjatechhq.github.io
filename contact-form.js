/**
 * Contact Form Google Sheets Integration
 * Handles form submission to Google Apps Script
 */

// Configuration - UPDATE THIS URL after deploying Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2RMHA0okBdivBSmWgi5kXvIK5_z0T0zqoNK-RNKuXlbCvaFPZsRFB6jOIdN3BD9mscQ/exec';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
});

/**
 * Handle form submission
 */
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const form = event.target;
    
    // Show loading state
    showLoadingState(submitBtn, formMessage);
    
    try {
        // Collect form data
        const formData = collectFormData(form);
        
        // Submit to Google Sheets
        const response = await submitToGoogleSheets(formData);
        
        if (response.success) {
            showSuccessMessage(formMessage, response.message);
            form.reset(); // Clear the form
        } else {
            showErrorMessage(formMessage, response.message);
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage(formMessage, 'Sorry, there was an error submitting your message. Please try again or call us directly at (904) 879-4357.');
    } finally {
        // Reset button state
        resetButtonState(submitBtn);
    }
}

/**
 * Collect form data
 */
function collectFormData(form) {
    const formData = new FormData(form);
    
    return {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        ipAddress: getUserIP(), // Will be filled by external service
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct',
        pageUrl: window.location.href
    };
}

/**
 * Submit data to Google Sheets via Apps Script
 */
async function submitToGoogleSheets(formData) {
    // Check if Google Script URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        throw new Error('Google Apps Script URL not configured. Please update GOOGLE_SCRIPT_URL in contact-form.js');
    }
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors'
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

/**
 * Get user IP address (optional enhancement)
 */
function getUserIP() {
    // This would require an external service like ipapi.co
    // For now, return placeholder
    return 'Unknown';
}

/**
 * Show loading state
 */
function showLoadingState(submitBtn, formMessage) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⏳</span> Sending...';
    formMessage.style.display = 'none';
}

/**
 * Reset button state
 */
function resetButtonState(submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message';
}

/**
 * Show success message
 */
function showSuccessMessage(formMessage, message) {
    formMessage.style.display = 'block';
    formMessage.style.backgroundColor = 'rgba(46, 125, 50, 0.9)';
    formMessage.style.color = '#ffffff';
    formMessage.style.border = '2px solid #2e7d32';
    formMessage.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span style="font-size: 20px;">✅</span>
            <span>${message}</span>
        </div>
    `;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

/**
 * Show error message
 */
function showErrorMessage(formMessage, message) {
    formMessage.style.display = 'block';
    formMessage.style.backgroundColor = 'rgba(198, 40, 40, 0.9)';
    formMessage.style.color = '#ffffff';
    formMessage.style.border = '2px solid #c62828';
    formMessage.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span style="font-size: 20px;">❌</span>
            <span>${message}</span>
        </div>
    `;
    
    // Auto-hide after 8 seconds (longer for error messages)
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 8000);
}

/**
 * Fallback form submission (if Google Sheets fails)
 */
function fallbackSubmission(formData) {
    // Create mailto link as fallback
    const subject = encodeURIComponent('Contact Form Submission - BSCM, INC.');
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}

Submitted: ${new Date().toLocaleString()}
    `);
    
    const mailtoLink = `mailto:Office@bscminc.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

/**
 * Add CSS for loading animation
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    #formMessage {
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    #submitBtn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

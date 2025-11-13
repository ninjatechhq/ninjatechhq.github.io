// Mobile hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create mobile overlay
    let mobileOverlay = document.querySelector('.mobile-overlay');
    if (!mobileOverlay) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        body.appendChild(mobileOverlay);
    }
    
    // Hamburger menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isMenuClick = e.target.closest('.nav-container');
            if (!isMenuClick && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
        
        // Close all dropdowns
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Handle mobile dropdown clicks
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

// Scroll-to-hide navigation
let lastScrollTop = 0;
const nav = document.querySelector('nav');
let scrollTimeout;

window.addEventListener('scroll', function() {
    // Clear the timeout if it exists
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Debounce scroll events for better performance
    scrollTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show nav at top of page
        if (scrollTop === 0) {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }
        // Hide nav when scrolling down, show when scrolling up
        else if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past threshold
            nav.classList.add('nav-hidden');
            nav.classList.remove('nav-visible');
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, 10); // 10ms debounce delay
});

// Return to Top Button functionality
const returnToTopBtn = document.getElementById('return-to-top');

// Show/hide return to top button based on scroll position
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) { // Show button after scrolling 300px
        returnToTopBtn.classList.add('show');
    } else {
        returnToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top when button is clicked
returnToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});

// Populate gallery with 80 images
if (document.querySelector('.gallery')) {
    const gallery = document.querySelector('.gallery');
    for (let i = 1; i <= 40; i++) {
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/300x200/333/4CAF50?text=Image+${i}`;
        img.alt = `Scrap Yard Photo ${i}`;
        gallery.appendChild(img);
    }
}

// Static price display functionality (no fluctuations)
document.addEventListener('DOMContentLoaded', () => {
    // Set static last updated time
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        const dateString = now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        lastUpdatedElement.textContent = `${dateString} at ${timeString}`;
    }
});

// Copper Modal Functions
function openCopperModal() {
    const modal = document.getElementById('copperModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeCopperModal() {
    const modal = document.getElementById('copperModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Aluminum Modal Functions
function openAluminumModal() {
    const modal = document.getElementById('aluminumModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeAluminumModal() {
    const modal = document.getElementById('aluminumModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Brass Modal Functions
function openBrassModal() {
    const modal = document.getElementById('brassModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeBrassModal() {
    const modal = document.getElementById('brassModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// ACR Modal Functions
function openACRModal() {
    const modal = document.getElementById('acrModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeACRModal() {
    const modal = document.getElementById('acrModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Automotive Modal Functions
function openAutoModal() {
    const modal = document.getElementById('autoModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeAutoModal() {
    const modal = document.getElementById('autoModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Sealed Units Modal Functions
function openSealedModal() {
    const modal = document.getElementById('sealedModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeSealedModal() {
    const modal = document.getElementById('sealedModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Specialty Modal Functions
function openSpecialtyModal() {
    const modal = document.getElementById('specialtyModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeSpecialtyModal() {
    const modal = document.getElementById('specialtyModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Restricted Items Modal Functions
function openRestrictedModal() {
    const modal = document.getElementById('restrictedModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeRestrictedModal() {
    const modal = document.getElementById('restrictedModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Vehicle Requirements Modal Functions
function openVehicleModal() {
    const modal = document.getElementById('vehicleModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeVehicleModal() {
    const modal = document.getElementById('vehicleModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
    const copperModal = document.getElementById('copperModal');
    const aluminumModal = document.getElementById('aluminumModal');
    const brassModal = document.getElementById('brassModal');
    const acrModal = document.getElementById('acrModal');
    const autoModal = document.getElementById('autoModal');
    const sealedModal = document.getElementById('sealedModal');
    const specialtyModal = document.getElementById('specialtyModal');
    const restrictedModal = document.getElementById('restrictedModal');
    const vehicleModal = document.getElementById('vehicleModal');
    const ferrousModal = document.getElementById('ferrousModal');
    const nonferrousModal = document.getElementById('nonferrousModal');
    
    if (copperModal && event.target === copperModal) {
        closeCopperModal();
    }
    if (aluminumModal && event.target === aluminumModal) {
        closeAluminumModal();
    }
    if (brassModal && event.target === brassModal) {
        closeBrassModal();
    }
    if (acrModal && event.target === acrModal) {
        closeACRModal();
    }
    if (autoModal && event.target === autoModal) {
        closeAutoModal();
    }
    if (sealedModal && event.target === sealedModal) {
        closeSealedModal();
    }
    if (specialtyModal && event.target === specialtyModal) {
        closeSpecialtyModal();
    }
    if (restrictedModal && event.target === restrictedModal) {
        closeRestrictedModal();
    }
    if (vehicleModal && event.target === vehicleModal) {
        closeVehicleModal();
    }
    if (ferrousModal && event.target === ferrousModal) {
        closeFerrousModal();
    }
    if (nonferrousModal && event.target === nonferrousModal) {
        closeNonferrousModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const copperModal = document.getElementById('copperModal');
        const aluminumModal = document.getElementById('aluminumModal');
        const brassModal = document.getElementById('brassModal');
        const acrModal = document.getElementById('acrModal');
        const autoModal = document.getElementById('autoModal');
        const sealedModal = document.getElementById('sealedModal');
        const specialtyModal = document.getElementById('specialtyModal');
        const restrictedModal = document.getElementById('restrictedModal');
        const vehicleModal = document.getElementById('vehicleModal');
        
        if (copperModal && copperModal.style.display === 'block') {
            closeCopperModal();
        }
        if (aluminumModal && aluminumModal.style.display === 'block') {
            closeAluminumModal();
        }
        if (brassModal && brassModal.style.display === 'block') {
            closeBrassModal();
        }
        if (acrModal && acrModal.style.display === 'block') {
            closeACRModal();
        }
        if (autoModal && autoModal.style.display === 'block') {
            closeAutoModal();
        }
        if (sealedModal && sealedModal.style.display === 'block') {
            closeSealedModal();
        }
        if (specialtyModal && specialtyModal.style.display === 'block') {
            closeSpecialtyModal();
        }
        if (restrictedModal && restrictedModal.style.display === 'block') {
            closeRestrictedModal();
        }
        if (vehicleModal && vehicleModal.style.display === 'block') {
            closeVehicleModal();
        }
        
        // Check for materials modals
        const ferrousModal = document.getElementById('ferrousModal');
        const nonferrousModal = document.getElementById('nonferrousModal');
        
        if (ferrousModal && ferrousModal.style.display === 'block') {
            closeFerrousModal();
        }
        if (nonferrousModal && nonferrousModal.style.display === 'block') {
            closeNonferrousModal();
        }
    }
});

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: scale(0.7) translateY(-50px);
            opacity: 0;
        }
        to {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Materials Modal Functions
function openFerrousModal() {
    const modal = document.getElementById('ferrousModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeFerrousModal() {
    const modal = document.getElementById('ferrousModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

function openNonferrousModal() {
    const modal = document.getElementById('nonferrousModal');
    if (modal) {
        modal.style.display = 'block';
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

function closeNonferrousModal() {
    const modal = document.getElementById('nonferrousModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

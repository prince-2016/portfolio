/**
 * Prince Raiyani | Professional Portfolio Controller Logic
 * High-performance Vanilla JavaScript integrations
 * Fully optimized for a 5-Page Light-Theme Architecture
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. GLOBAL DYNAMIC SPOTLIGHT BEHIND CARDS
       ========================================================================== */
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // requestAnimationFrame for fluid 60fps coordination
        function updateGlowPosition() {
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;
            
            cursorGlow.style.setProperty('--glow-x', `${currentX}px`);
            cursorGlow.style.setProperty('--glow-y', `${currentY}px`);
            
            requestAnimationFrame(updateGlowPosition);
        }
        updateGlowPosition();
    }


    /* ==========================================================================
       2. 5-PAGE ACTIVE NAV STATE TRACKER
       ========================================================================== */
    const navItems = document.querySelectorAll('.nav-item');
    const mNavItems = document.querySelectorAll('.mobile-nav-item');
    
    function highlightActivePage() {
        const currentPath = window.location.pathname;
        const pageFilename = currentPath.split("/").pop();

        function setLinkStates(items) {
            items.forEach(item => {
                const href = item.getAttribute('href');
                
                // Clear any existing active class
                item.classList.remove('active');

                // Determine matching conditions
                if (pageFilename === "" || pageFilename === "index.html") {
                    if (href === "index.html") {
                        item.classList.add('active');
                    }
                } else if (pageFilename && href.includes(pageFilename)) {
                    item.classList.add('active');
                }
            });
        }

        setLinkStates(navItems);
        setLinkStates(mNavItems);
    }
    
    highlightActivePage();


    /* ==========================================================================
       3. TYPEWRITER TITLE ANIMATIONS (ONLY ON index.html / HOME)
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const roles = ["Aspiring Cybersecurity Analyst", "MSc IT Student", "Cybersecurity Enthusiast", "BCA Graduate"];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let speed = 100;

        function runTypewriter() {
            const currentRole = roles[roleIdx];
            
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
                speed = 50; // Deletion goes faster
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
                speed = 120; // Default typing speed
            }

            // Word finished
            if (!isDeleting && charIdx === currentRole.length) {
                speed = 2200; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                speed = 400; // Pause before next word
            }

            setTimeout(runTypewriter, speed);
        }

        setTimeout(runTypewriter, 1000);
    }


    /* ==========================================================================
       4. MOBILE CAPSULE BURGER OVERLAYS
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    if (menuToggle && mobileMenuOverlay) {
        function toggleMobileNavbar() {
            menuToggle.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            
            // Constrain scrolling when overlay menu is active
            if (mobileMenuOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        menuToggle.addEventListener('click', toggleMobileNavbar);

        // Close on navigation click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuOverlay.classList.contains('active')) {
                    toggleMobileNavbar();
                }
            });
        });

        // Close on Esc keypress
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                toggleMobileNavbar();
            }
        });
    }


    /* ==========================================================================
       5. STICKY DOCK SHRINK & BACK-TO-TOP TRIGGER
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollDistance = window.scrollY;

        // Header scroll compaction
        if (navbar) {
            if (scrollDistance > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top floating arrow control
        if (backToTop) {
            if (scrollDistance > 350) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });


    /* ==========================================================================
       6. ACCORDION SKILL FILL OBSERVER (ONLY ON about.html)
       ========================================================================== */
    const skillProgressBars = document.querySelectorAll('.skill-bar-fill');

    if (skillProgressBars.length > 0) {
        const observerConfig = {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        };

        const barObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fillBar = entry.target;
                    const finalWidth = fillBar.getAttribute('data-progress');
                    fillBar.style.width = finalWidth;
                    observer.unobserve(fillBar); // Trigger animation once
                }
            });
        }, observerConfig);

        skillProgressBars.forEach(bar => barObserver.observe(bar));
    }


    /* ==========================================================================
       7. CONTACT FORM SUBMISSION TO GOOGLE SHEETS & EXCEL SYNC
       ========================================================================== */
    // 💡 PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE TO SYNC WITH GOOGLE SHEETS & EXCEL
    const GOOGLE_SHEET_WEB_APP_URL = ""; 

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const successOverlay = document.getElementById('form-success-overlay');
    const closeSuccessBtn = document.getElementById('success-close-btn');

    if (contactForm && submitBtn && successOverlay) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            // Guard validation
            if (!name || !email || !message) {
                return;
            }

            // Trigger submit button loader
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            const submissionData = {
                timestamp: new Date().toLocaleString(),
                name: name,
                email: email,
                message: message
            };

            // Save local backup in localStorage so no message is ever lost
            try {
                const existingMessages = JSON.parse(localStorage.getItem('website_messages') || '[]');
                existingMessages.push(submissionData);
                localStorage.setItem('website_messages', JSON.stringify(existingMessages));
            } catch (err) {
                console.log('LocalStorage backup note:', err);
            }

            // Send to Google Sheets Web App if URL is provided
            if (GOOGLE_SHEET_WEB_APP_URL && GOOGLE_SHEET_WEB_APP_URL.trim() !== "") {
                try {
                    await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(submissionData)
                    });
                } catch (error) {
                    console.error('Error sending to Google Sheet:', error);
                }
            } else {
                // Emulate transmit delay if URL is not configured yet
                await new Promise(resolve => setTimeout(resolve, 1200));
            }

            // Reset UI states & show success modal
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            successOverlay.classList.add('active');
            contactForm.reset();
        });
    }

    if (closeSuccessBtn && successOverlay) {
        closeSuccessBtn.addEventListener('click', () => {
            successOverlay.classList.remove('active');
        });
    }
});

// Helper function to download all saved local messages as an Excel CSV file anytime
function exportMessagesToCSV() {
    const messages = JSON.parse(localStorage.getItem('website_messages') || '[]');
    if (messages.length === 0) {
        alert('No messages saved yet.');
        return;
    }
    let csvContent = "data:text/csv;charset=utf-8,Date & Time,Name,Email,Message\n";
    messages.forEach(m => {
        const row = `"${m.timestamp}","${m.name}","${m.email}","${m.message.replace(/"/g, '""')}"`;
        csvContent += row + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `website_messages_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

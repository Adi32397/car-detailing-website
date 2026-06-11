// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Statistics Counter Animation
const statsSection = document.getElementById('stats');
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos) {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    // Check if it's a float
                    if (target % 1 !== 0) {
                        stat.innerText = current.toFixed(1) + (target > 10 ? '+' : '');
                    } else {
                        stat.innerText = Math.ceil(current) + (target > 10 ? '+' : '');
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target + (target > 10 ? '+' : '');
                }
            };
            updateCounter();
        });
        animated = true;
    }
}
window.addEventListener('scroll', animateStats);

// Form Submission & Auth Integration
const API_BASE = 'http://localhost:3000/api';

// Check Auth State on Load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    const authNavLi = document.getElementById('authNavLi');
    
    if (token && user) {
        // Change Sign In to Logout
        authNavLi.innerHTML = `<a href="#" id="logoutBtn"><i class="fa-solid fa-sign-out-alt"></i> Logout (${user.name})</a>`;
        
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
        });

        // Pre-fill forms if elements exist
        const bName = document.getElementById('bName');
        const bEmail = document.getElementById('bEmail');
        if (bName) bName.value = user.name;
        if (bEmail) bEmail.value = user.email;

        const cName = document.getElementById('cName');
        const cEmail = document.getElementById('cEmail');
        if (cName) cName.value = user.name;
        if (cEmail) cEmail.value = user.email;
    }
});

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bookingData = {
            name: document.getElementById('bName').value,
            phone: document.getElementById('bPhone').value,
            email: document.getElementById('bEmail').value,
            vehicle_type: document.getElementById('bVehicle').value,
            service_type: document.getElementById('bService').value,
            booking_date: document.getElementById('bDate').value,
            special_instructions: document.getElementById('bInstructions').value
        };

        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers,
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                alert('Thank you for your booking request! Our team will contact you shortly.');
                bookingForm.reset();
            } else {
                alert('Failed to submit booking. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const contactData = {
            name: document.getElementById('cName').value,
            email: document.getElementById('cEmail').value,
            message: document.getElementById('cMessage').value
        };

        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${API_BASE}/contacts`, {
                method: 'POST',
                headers,
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                alert('Your message has been sent successfully!');
                contactForm.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

// Search Functionality
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

function performSearch() {
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    // Define search mapping based on servicesData keys
    const serviceKeywords = {
        'ceramic': 'ceramic-coating',
        'coating': 'ceramic-coating',
        'exterior': 'exterior-detailing',
        'wash': 'exterior-detailing',
        'wax': 'exterior-detailing',
        'interior': 'interior-detailing',
        'clean': 'interior-detailing',
        'deep': 'interior-detailing',
        'ppf': 'ppf',
        'paint protection': 'ppf',
        'film': 'ppf',
        'headlight': 'headlight-restoration',
        'restore': 'headlight-restoration',
        'engine': 'engine-bay-cleaning',
        'bay': 'engine-bay-cleaning'
    };

    let matchedServiceId = null;
    
    // Exact match first
    if (serviceKeywords[query]) {
        matchedServiceId = serviceKeywords[query];
    } else {
        // Partial match
        for (const [keyword, id] of Object.entries(serviceKeywords)) {
            if (query.includes(keyword) || keyword.includes(query)) {
                matchedServiceId = id;
                break;
            }
        }
    }

    if (matchedServiceId) {
        window.location.href = `service-details.html?id=${matchedServiceId}`;
    } else {
        alert("Sorry, we couldn't find a matching service. Please try searching for 'Ceramic', 'Interior', 'Wash', etc.");
    }
}

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}

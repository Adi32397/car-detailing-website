document.addEventListener('DOMContentLoaded', () => {
    // Get service ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    if (!serviceId || !servicesData[serviceId]) {
        // Fallback if invalid ID
        document.getElementById('sd-title').textContent = "Service Not Found";
        document.getElementById('sd-overview').textContent = "Please return to the home page and select a valid service.";
        return;
    }

    const service = servicesData[serviceId];

    // Populate Hero Section
    document.getElementById('sd-title').textContent = service.title;
    document.getElementById('sd-overview').textContent = service.overview;
    document.getElementById('sd-duration').textContent = service.duration;
    document.getElementById('sd-frequency').textContent = service.frequency;
    document.getElementById('sd-warranty').textContent = service.warranty;

    // Populate Benefits
    const benefitsContainer = document.getElementById('sd-benefits');
    service.benefits.forEach((benefit, index) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="icon"><i class="fa-solid ${benefit.icon}"></i></div>
            <h3 style="font-size: 1.1rem; margin-top: 10px;">${benefit.text}</h3>
        `;
        benefitsContainer.appendChild(card);
    });

    // Populate Process Timeline
    const processContainer = document.getElementById('sd-process');
    service.process.forEach((step, index) => {
        const item = document.createElement('div');
        const alignment = index % 2 === 0 ? 'left' : 'right';
        item.className = `timeline-item ${alignment}`;
        item.innerHTML = `
            <div class="timeline-content">
                <h3>Step ${index + 1}: ${step.title}</h3>
                <p>${step.description}</p>
            </div>
        `;
        processContainer.appendChild(item);
    });

    // Populate Pricing
    const pricingContainer = document.getElementById('sd-pricing');
    service.pricing.forEach((pkg, index) => {
        const isPremium = index === 1 ? 'premium' : '';
        const card = document.createElement('div');
        card.className = `pricing-card ${isPremium}`;
        
        let featuresHtml = pkg.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('');
        
        card.innerHTML = `
            <h3>${pkg.name}</h3>
            <div class="price">${pkg.price}</div>
            <ul class="features">
                ${featuresHtml}
            </ul>
            <a href="index.html#book" class="btn ${isPremium ? '' : 'btn-outline'}">Select Package</a>
        `;
        pricingContainer.appendChild(card);
    });

    // Populate FAQ
    const faqContainer = document.getElementById('sd-faq');
    service.faq.forEach((faqItem, index) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <div class="faq-question">
                <span>${faqItem.q}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p style="padding-top: 10px;">${faqItem.a}</p>
            </div>
        `;
        
        item.querySelector('.faq-question').addEventListener('click', () => {
            // Toggle current
            item.classList.toggle('active');
            
            // Close others
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
        
        faqContainer.appendChild(item);
    });
});

const servicesData = {
    "ceramic-coating": {
        title: "Ceramic Coating",
        overview: "Experience the ultimate in paint protection. Our nano-ceramic coating forms a permanent bond with your vehicle's paint, creating a shield that is far superior to traditional wax.",
        duration: "1–2 Days",
        frequency: "Every 2–5 Years",
        warranty: "5-Year Manufacturer Warranty",
        heroImage: "assets/hero.png",
        benefits: [
            { icon: "fa-shield-halved", text: "Long-lasting paint protection" },
            { icon: "fa-sun", text: "UV protection against fading" },
            { icon: "fa-droplet", text: "Hydrophobic water-repellent effect" },
            { icon: "fa-car-burst", text: "Scratch resistance" },
            { icon: "fa-sparkles", text: "High gloss, mirror-like finish" }
        ],
        process: [
            { title: "Vehicle Inspection", description: "Detailed assessment of paint condition." },
            { title: "Deep Wash", description: "Thorough hand wash to remove loose dirt." },
            { title: "Paint Decontamination", description: "Clay bar treatment and iron removal." },
            { title: "Paint Correction", description: "Machine polishing to remove swirls and scratches." },
            { title: "Ceramic Coating Application", description: "Precise hand application of the nano-coating." },
            { title: "Curing Process", description: "Controlled curing for maximum durability." }
        ],
        pricing: [
            { name: "Standard Coating", price: "₹8000", features: ["1 Layer Coating", "2-Year Durability", "Light Polish"] },
            { name: "Pro Coating", price: "₹15000", features: ["2 Layers Coating", "5-Year Durability", "Full Paint Correction"] }
        ],
        faq: [
            { q: "How long does the coating last?", a: "Depending on the package, our coatings last between 2 to 5 years with proper maintenance." },
            { q: "Do I still need to wax my car?", a: "No! The ceramic coating replaces the need for traditional wax entirely." }
        ]
    },
    "exterior-detailing": {
        title: "Exterior Detailing",
        overview: "Restore your vehicle's exterior to a showroom shine. We meticulously clean, decontaminate, and protect every exterior surface.",
        duration: "2–4 Hours",
        frequency: "Monthly",
        warranty: "Satisfaction Guaranteed",
        heroImage: "assets/hero.png",
        benefits: [
            { icon: "fa-soap", text: "Foam Wash & Decontamination" },
            { icon: "fa-ring", text: "Deep Wheel Cleaning" },
            { icon: "fa-shield", text: "Wax Protection" },
            { icon: "fa-eye", text: "Streak-free Window Cleaning" }
        ],
        process: [
            { title: "Snow Foam Pre-Wash", description: "Lifts dirt without scratching." },
            { title: "Two-Bucket Wash", description: "Safe hand wash technique." },
            { title: "Wheels & Tires", description: "Deep cleaning and dressing." },
            { title: "Decontamination", description: "Removal of embedded iron and tar." },
            { title: "Protection Application", description: "High-quality wax or sealant applied." }
        ],
        pricing: [
            { name: "Basic Wash", price: "₹2000", features: ["Foam Wash", "Tire Dressing", "Spray Wax"] },
            { name: "Premium Detail", price: "₹3500", features: ["Clay Bar Treatment", "Carnauba Wax", "Trim Restoration"] }
        ],
        faq: [
            { q: "Does this remove scratches?", a: "Exterior detailing cleans and protects. To remove scratches, you will need a Paint Correction service." }
        ]
    },
    "interior-detailing": {
        title: "Interior Detailing",
        overview: "Breathe new life into your cabin. Our deep cleaning process removes stains, odors, and bacteria, leaving your interior looking and smelling like new.",
        duration: "3–5 Hours",
        frequency: "Every 3-6 Months",
        warranty: "Satisfaction Guaranteed",
        heroImage: "assets/interior.png",
        benefits: [
            { icon: "fa-wind", text: "Vacuuming & Dusting" },
            { icon: "fa-couch", text: "Leather Conditioning" },
            { icon: "fa-rug", text: "Carpet Shampooing" },
            { icon: "fa-spray-can", text: "Odor Removal & Sanitization" }
        ],
        process: [
            { title: "Deep Vacuum", description: "Thorough vacuuming of all surfaces and crevices." },
            { title: "Steam Cleaning", description: "Sanitizing vents and cup holders." },
            { title: "Upholstery Extraction", description: "Shampooing fabric seats and carpets." },
            { title: "Leather Care", description: "Cleaning and conditioning leather surfaces." },
            { title: "Glass & Trim", description: "Cleaning interior windows and dressing plastics." }
        ],
        pricing: [
            { name: "Mini Interior", price: "₹2500", features: ["Vacuum", "Wipe Down", "Glass Cleaning"] },
            { name: "Deep Clean", price: "₹4500", features: ["Carpet Shampoo", "Leather Conditioning", "Odor Treatment"] }
        ],
        faq: [
            { q: "Can you remove tough stains?", a: "We can remove most organic stains, but some permanent dyes may only be lightened." }
        ]
    },
    "ppf": {
        title: "Paint Protection Film (PPF)",
        overview: "The ultimate invisible shield for your vehicle. PPF absorbs impacts from road debris, preventing rock chips and deep scratches.",
        duration: "2–4 Days",
        frequency: "Once",
        warranty: "10-Year Manufacturer Warranty",
        heroImage: "assets/hero.png",
        benefits: [
            { icon: "fa-meteor", text: "Stone Chip Protection" },
            { icon: "fa-scissors", text: "Scratch Resistance" },
            { icon: "fa-wand-magic-sparkles", text: "Self-Healing Technology" },
            { icon: "fa-sun", text: "UV Protection" }
        ],
        process: [
            { title: "Surface Prep", description: "Extensive washing and decontamination." },
            { title: "Pattern Cutting", description: "Computer-cut patterns for exact fitment." },
            { title: "Application", description: "Applying the film using slip and tack solutions." },
            { title: "Edge Wrapping", description: "Tucking edges for a seamless look." },
            { title: "Final Inspection", description: "Checking for bubbles and perfect alignment." }
        ],
        pricing: [
            { name: "Partial Front", price: "₹9000", features: ["Bumper", "Partial Hood", "Mirrors"] },
            { name: "Full Front", price: "₹14000", features: ["Full Bumper", "Full Hood", "Full Fenders"] }
        ],
        faq: [
            { q: "Will the film yellow over time?", a: "Our modern, premium films are guaranteed against yellowing and peeling for 10 years." }
        ]
    },
    "headlight-restoration": {
        title: "Headlight Restoration",
        overview: "Don't replace foggy headlights—restore them! We remove oxidation to bring back crystal-clear visibility and improve safety.",
        duration: "1–2 Hours",
        frequency: "As Needed",
        warranty: "1-Year Warranty",
        heroImage: "assets/hero.png",
        benefits: [
            { icon: "fa-lightbulb", text: "Removes Yellowing & Oxidation" },
            { icon: "fa-eye", text: "Better Nighttime Visibility" },
            { icon: "fa-car", text: "Improved Vehicle Appearance" },
            { icon: "fa-shield-heart", text: "Safer Driving" }
        ],
        process: [
            { title: "Masking", description: "Protecting surrounding paint with tape." },
            { title: "Wet Sanding", description: "Progressive sanding to remove dead plastic." },
            { title: "Compounding", description: "Machine polishing to restore clarity." },
            { title: "UV Sealing", description: "Applying a ceramic sealant to prevent future yellowing." }
        ],
        pricing: [
            { name: "Standard Restoration", price: "₹1500", features: ["Oxidation Removal", "Polishing", "Standard Sealant"] },
            { name: "Ceramic Restoration", price: "₹2500", features: ["Heavy Sanding", "Perfect Clarity", "Ceramic UV Coating"] }
        ],
        faq: [
            { q: "Why do headlights get foggy?", a: "UV rays break down the factory clear coat on plastic headlight lenses over time." }
        ]
    },
    "engine-bay-cleaning": {
        title: "Engine Bay Cleaning",
        overview: "A clean engine runs cooler and is easier to maintain. We safely degrease and dress your engine bay for a spotless finish.",
        duration: "1 Hour",
        frequency: "Yearly",
        warranty: "Safe Wash Guarantee",
        heroImage: "assets/hero.png",
        benefits: [
            { icon: "fa-gears", text: "Heavy Degreasing" },
            { icon: "fa-broom", text: "Dust & Grime Removal" },
            { icon: "fa-spray-can-sparkles", text: "Plastic Trim Dressing" },
            { icon: "fa-plug", text: "Safe Electrical Protection" }
        ],
        process: [
            { title: "Preparation", description: "Covering sensitive electrical components." },
            { title: "Degreasing", description: "Applying specialized engine cleaners." },
            { title: "Agitation", description: "Using detail brushes to break up heavy grime." },
            { title: "Rinsing", description: "Low-pressure rinse to safely remove chemicals." },
            { title: "Dressing", description: "Applying a non-greasy dressing to plastics." }
        ],
        pricing: [
            { name: "Engine Detail", price: "₹1000", features: ["Safe Degrease", "Brush Agitation", "Plastic Dressing"] }
        ],
        faq: [
            { q: "Is it safe to wash an engine?", a: "Yes, when done correctly. We use low pressure and protect sensitive electronics." }
        ]
    }
};

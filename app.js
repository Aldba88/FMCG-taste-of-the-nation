document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const fullName = document.getElementById('fullName').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;

    console.log('Full Name:', fullName);
    console.log('Company:', company);
    console.log('Email:', email);

    // Simulate downloading PDF
    window.location.href = 'path/to/your/pdf/DC-24415_HF-AU-Taste-of-Nation-Report-2022-2023_1980x1020_V7 (1) (1).pdf';
});

// Load Calendly widget..
window.onload = function() {
    Calendly.initInlineWidget({
        url: 'https://calendly.com/aldoballarini',
        parentElement: document.getElementById('calendly-widget'),
        prefill: {},
        utm: {}
    });
};

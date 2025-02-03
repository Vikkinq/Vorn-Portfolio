// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send this data to a server
        // For demonstration, we'll just log it and show an alert
        console.log('Form submitted:', { name, email, message });
        
        // Simulate sending email
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }, 1000);
    });
});


// Dust Animation

function createDustEffect() {
    const dustContainer = document.getElementById('dust-container');
    const numberOfParticles = 500;
  
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'dust-particle';
      
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
  
      dustContainer.appendChild(particle);
    }
  }
  
  // Call this function when the page loads
  document.addEventListener('DOMContentLoaded', createDustEffect);
  
  // Existing dark mode toggle function (update if necessary)
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  }
  
  // Function to set initial theme
  function setInitialTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      document.body.classList.add('dark-mode');
    }
  }
  
  // Call this function when the page loads
  document.addEventListener('DOMContentLoaded', setInitialTheme);
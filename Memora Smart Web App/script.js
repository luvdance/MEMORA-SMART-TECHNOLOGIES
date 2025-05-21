
document.addEventListener('DOMContentLoaded', function() {
    const portfolioContainer = document.getElementById('portfolio-container');
    const slides = document.querySelectorAll('#portfolio-container .slide');
    let currentIndex = 0;

    // Create navigation boxes
    const navContainer = document.createElement('div');
    navContainer.id = 'portfolio-nav';
    portfolioContainer.after(navContainer); // Insert after portfolioContainer

    slides.forEach((_, index) => {
        const navBox = document.createElement('div');
        navBox.classList.add('nav-box');
        navBox.dataset.index = index;
        navContainer.appendChild(navBox);
    });

    const navBoxes = document.querySelectorAll('.nav-box');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'flex';
            } else {
                slide.style.display = 'none';
            }
        });
        updateNav();
    }

    function updateNav() {
        navBoxes.forEach((box, index) => {
            if (index === currentIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentIndex = index;
            showSlide(currentIndex);
        }
    }

    // Initial setup
    showSlide(currentIndex);

    // Event listeners for navigation boxes
    navBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
        });
    });
});

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');

    // Clear existing mobile nav links
    mobileNavLinks.innerHTML = '';

    // Clone and append nav links to mobile menu
    navLinks.querySelectorAll('li').forEach(li => {
        mobileNavLinks.appendChild(li.cloneNode(true));
    });

    mobileMenu.style.display = 'block';
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');

    menuToggle.addEventListener('click', toggleMobileMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
});

document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.getElementById('logo-img');

    logoImg.addEventListener('click', function() {
        window.location.href = '/';
    });
});

/*section for hero slide*/
const heroTitle = document.getElementById('hero-title');
const heroText = document.getElementById('hero-text');
const heroImg = document.getElementById('hero-img');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');
const heroSection = document.getElementById('hero-section'); // Add the hero section ID

const slides = [
    {
        title: "Digital Marketing",
        text: "Did you know that over 5.44 billion people—approximately two-thirds of the global population — are active internet users? This expansive digital audience presents an unparalleled opportunity for businesses to connect with potential customers worldwide.",
        image: "images/hero 1.jpeg"
    },
    {
        title: "Software Development",
        text: "In today’s fast-paced digital world, businesses are no longer run analogously but can be managed and monitored from the comfort of your home. Track sales, manage inventories, hire employees, streamline operations, and optimize customer interactions—all in one place through our intelligent, custom-built software solutions.",
        image: "images/hero 2.jpeg"
    },
    {
        title: "Training and Workshops",
        text: "Equip yourself with the cutting-edge skills needed to thrive in today’s fast-evolving tech landscape. Learn the fundamentals of digital marketing, harness the power of business automation, and gain hands-on experience with industry-proven tools and strategies.",
        image: "images/hero 4.jpeg"
    }
];

let currentIndex = 0;
let slideInterval;

function changeSlide(direction = 1) {
    heroTitle.classList.add("fade-out");
    heroText.classList.add("fade-out");
    heroImg.classList.add("fade-out");

    setTimeout(() => {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;

        heroTitle.textContent = slides[currentIndex].title;
        heroText.textContent = slides[currentIndex].text;
        heroImg.src = slides[currentIndex].image;

        heroTitle.classList.remove("fade-out");
        heroText.classList.remove("fade-out");
        heroImg.classList.remove("fade-out");

    }, 1000);
}

// Function to start slideshow
function startSlideshow() {
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

// Function to stop slideshow
function stopSlideshow() {
    clearInterval(slideInterval);
}

// Start slideshow on page load
startSlideshow();

// Pause slideshow on hover
if (heroSection) {
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
  
    // Click event listeners for left and right sides of heroSection
    heroSection.addEventListener('click', (event) => {
      const rect = heroSection.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const sectionWidth = rect.width;
  
      if (clickX < sectionWidth / 2) {
        changeSlide(-1); // Left side click
      } else {
        changeSlide(1); // Right side click
      }
    });
  }

const actionBtn = document.getElementById('action-btn');
actionBtn.addEventListener('click', ()=>{
    alert('We are working on this feature. Please check back later.');
})

const searchPage = () => {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return console.error('Search input not found.');

  const searchResults = document.createElement('div');
  searchResults.id = 'search-results';
  Object.assign(searchResults.style, {
    position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc',
    width: `${searchInput.offsetWidth}px`, marginTop: '5px', zIndex: '1000',
    maxHeight: '200px', overflowY: 'auto', display: 'none', padding: '5px',
    top: `${searchInput.offsetTop + searchInput.offsetHeight + 5}px`
  });
  searchInput.parentNode.insertBefore(searchResults, searchInput.nextSibling);

  const performSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return (searchResults.style.display = 'none');

    searchResults.innerHTML = '';
    document.querySelectorAll('body *').forEach(element => {
      resetHighlight(element);
      const foundTerms = highlightText(element, searchTerm); // Get the found terms
      if (foundTerms.length > 0) { // If any terms were found
        foundTerms.forEach(foundTerm => { // Create result for each found term
          const resultItem = document.createElement('div');
          resultItem.textContent = foundTerm; // Display the actual found term
          resultItem.style.cursor = 'pointer';
          resultItem.style.padding = '5px';
          resultItem.addEventListener('click', () => element.scrollIntoView({ behavior: 'smooth', block: 'center' }));
          searchResults.appendChild(resultItem);
        });
      }
    });
    searchResults.style.display = searchResults.innerHTML ? 'block' : 'none';
  };

  const highlightText = (element, searchTerm) => {
    let foundTerms = []; // Store the found terms
    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        const regex = new RegExp(`\\b${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        if (regex.test(text)) {
          foundTerms.push(searchTerm); // Store the actual found term
          const highlightedText = text.replace(regex, match => `<span style="background-color: yellow;">${match}</span>`);
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = highlightedText;
          while (tempDiv.firstChild) node.parentNode.insertBefore(tempDiv.firstChild, node);
          node.remove();
        }
      }
    });
    return foundTerms; // Return the found terms
  };

  const resetHighlight = element => {
    element.querySelectorAll('span[style="background-color: yellow;"]').forEach(span => {
      span.replaceWith(document.createTextNode(span.textContent));
    });
  };

  searchInput.addEventListener('input', performSearch);
};

searchPage();
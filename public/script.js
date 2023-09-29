
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const services = document.querySelector('.s_one');

registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
});

window.onload = function () {
  window.scrollTo(0, 0);
};

// Function to handle smooth scrolling to the target element
function scrollToElement(target, offset) {
  const element = document.querySelector(target);
  if (element) {
    const offsetTop = element.offsetTop - offset;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
}

// Add click event listeners to the links
const links = document.querySelectorAll('a[href^="#"]');
if (links) {
  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior
      const headerHeight = 100; // Replace this with the actual height of your header in pixels
      const targetId = this.getAttribute('href');
      scrollToElement(targetId, headerHeight);
    });
  });
}

setTimeout(function () {
  document.querySelector('.loading-screen').style.display = 'none';
  document.querySelector('.main-content').style.display = 'block';
}, 20);

const searchBox = document.getElementById('search-box');
const searchContainer = document.querySelector('.search-cont');

searchBox.addEventListener('focus', function () {
  searchContainer.classList.add('active');
});

searchBox.addEventListener('blur', function () {
  searchContainer.classList.remove('active');
});

// For search bar
const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchTerm = searchBox.value.trim();
  // Perform your search logic here (for example, redirecting to the search URL)
  if (searchTerm) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
  }
  searchBox.value = ''; // Clear the search box after the search is performed
});


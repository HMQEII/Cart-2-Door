
function showIframe(cardName, cardText) {
    // Hide all iframes
    const iframes = document.querySelectorAll('.hidden-iframe');
    iframes.forEach(iframe => {
        iframe.style.display = 'none';
    });

    // Show the iframe for the clicked card
    const iframe = document.getElementById(cardName + 'Iframe');
    if (iframe) {
        iframe.style.display = 'block';

        // Update the <h2> element with the card text including "Under"
        const h2 = document.getElementById('cardTitle');
        if (h2) {
            h2.innerText = `Under ${cardText}`;
        }

        // Get the header height (adjust this value as needed)
        const headerHeight = 150; // Change this to your actual header height

        // Calculate the scroll position
        const iframePosition = iframe.getBoundingClientRect().top + window.scrollY - headerHeight;

        // Scroll to the iframe's position
        window.scrollTo({
            top: iframePosition,
            behavior: 'smooth' // You can use 'auto' for immediate scrolling
        });
    }
}


function performSearch() {
    // Get the search query from the input
    const searchQuery = document.getElementById('search-box').value.toLowerCase().trim();

    // Get all the elements on the page where you want to search (e.g., headings)
    const searchableElements = document.querySelectorAll('h2, h3, p, a'); // You can add more elements as needed

    // Loop through the elements and check if the search query is present
    for (const element of searchableElements) {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchQuery)) {
            // If found, scroll to the element
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return; // Stop searching after the first match
        }
    }

    // If no match is found, you can display a message or take another action
    alert('No results found for your search.');
}

// Listen for the Enter key press in the search input
document.getElementById('search-box').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});


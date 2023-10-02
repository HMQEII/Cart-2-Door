
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

function hideAllIframes() {
    // Get all iframes with a specific class (e.g., 'hidden-iframe')
    const iframes = document.querySelectorAll('.hidden-iframe');
    document.getElementById('cardTitle').textContent=" ";
    // Hide each iframe
    iframes.forEach(iframe => {
        iframe.style.display = 'none';
    });
}

function clearSelectedThings(){
    clearSelectedItems();
    hideAllIframes();
}
// JavaScript code to show the banner
const banner = document.querySelector('.banner');
banner.classList.add('show'); // Add the 'show' class to trigger the animation

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


function addToSelectedListAndShowIframe( iframeId, itemName) {
    clearSelectedItems();
    addToSelectedList(itemName);
    showIframe(iframeId, itemName);
}

const selectedItems = [];

function clearSelectedItems() {
    const selecstoreElement = document.getElementById('selecshop');
    const selecitemElement = document.getElementById('selecitem');
    selecstoreElement.textContent='#';
    selecitemElement.textContent='#';
    selectedItems.length = 0; // Clear the array
}

function addToSelectedList(id) {
    selectedItems.push(id);
}

// Function to handle messages from the iframe
function handleMessage(event) {
    if (event.data && event.data.selectedItem) {
        // Add the selected item to the array
        selectedItems.push(event.data.selectedItem);

        // Display the selected items in an alert
        displaySelectedItems();
    }
}

// Add an event listener to listen for messages from the iframe
window.addEventListener('message', handleMessage);

//display the selected stuff in the label made in the html page
function displaySelectedItems() {
    const selecstoreElement = document.getElementById('selecshop');
    const selecitemElement = document.getElementById('selecitem');

    if (selectedItems.length > 0) {
        if (selecstoreElement.textContent === '#') {
            selecstoreElement.textContent = selectedItems.shift(); // Display the first item in selecshop
        }
        if (selectedItems.length > 0) {
            selecitemElement.textContent = selectedItems.join('\n'); // Display the remaining items in selecitem
        }
    } else {
        selecstoreElement.textContent = 'No items selected.';
    }
}

// Add this code to your main page JavaScript
function scrollToSelectedLabel() {
    const selectedLabel = document.getElementById('selected-label');

    if (selectedLabel) {
        const scrollPosition = selectedLabel.getBoundingClientRect().top + window.scrollY - 100;

        // Scroll to the calculated position
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
}

function handleMessageforscroll(event) {
    if (event.data && event.data.selectedItem) {
        // Add the selected item to the array
        selectedItems.push(event.data.selectedItem);

        // Scroll to the "Selected" label
        scrollToSelectedLabel();
    }
}
window.addEventListener('message', handleMessageforscroll);
function showIframe(cardName) {
    // Hide all iframes
    const iframes = document.querySelectorAll('.hidden-iframe');
    iframes.forEach(iframe => {
        iframe.style.display = 'none';
    });

    // Show the iframe for the clicked card
    const iframe = document.getElementById(cardName + 'Iframe');
    if (iframe) {
        iframe.style.display = 'block';

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

// Function to handle the fade-in effect on scroll for multiple animations
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-up');
    elements.forEach(el => {
        if (el.classList.contains('is-visible')) {
            return;
        }
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        // Element is visible if its top is in the viewport, or its bottom is in the viewport
        if (rect.top <= viewportHeight * 0.85 && rect.bottom >= 0) {
            el.classList.add('is-visible');
        }
    });
}

// Attach scroll event listener
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', () => {
    // Run on page load to check initial positions
    handleScrollAnimation();
});
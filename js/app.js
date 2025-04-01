document.addEventListener('DOMContentLoaded', () => {
    // Fallback if loading takes too long
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader && loader.style.display !== 'none') {
            loader.innerHTML = 
                '<div>Loading is taking too long<br>' +
                '1. Check location permissions<br>' +
                '2. Try moving to an open area</div>';
        }
    }, 15000);
});

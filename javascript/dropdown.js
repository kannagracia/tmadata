document.addEventListener('DOMContentLoaded', function() {
    const userDropdown = document.querySelector('.user-dropdown');
    // Ensure the elements exist before trying to manipulate them
    if (userDropdown) {
        const dropdownToggle = userDropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = userDropdown.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', function() {
                // Toggle the 'show' class on the parent dropdown container
                userDropdown.classList.toggle('show');

                // Update ARIA attribute for accessibility
                const isExpanded = userDropdown.classList.contains('show');
                dropdownToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close the dropdown if the user clicks outside of it
            document.addEventListener('click', function(event) {
                // Check if the click was outside the dropdown container
                if (!userDropdown.contains(event.target)) {
                    if (userDropdown.classList.contains('show')) {
                        userDropdown.classList.remove('show');
                        dropdownToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Optional: Close dropdown if escape key is pressed
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && userDropdown.classList.contains('show')) {
                    userDropdown.classList.remove('show');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    dropdownToggle.focus(); // Return focus to the toggle button
                }
            });
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
// console.log("Login script loaded. Add your JavaScript here!");

    const form = document.getElementById('profile-settings-form'); // Assuming you use this ID for the login form too, or adjust.
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // --- Simulate Login Success ---
            // In a real application, you would send credentials to a server here.
            // If the server response is successful, then proceed with redirection.

            console.log("Login button clicked! Simulating successful login...");
            
            // Redirect to index.html (or dashboard.html if you renamed it)
            // This line will change the browser's URL
            window.location.href = 'home.html'; 
            // If you renamed your original index.html to dashboard.html, use:
            // window.location.href = 'dashboard.html'; 
        });
    }
});


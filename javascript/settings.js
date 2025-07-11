document.addEventListener('DOMContentLoaded', function() {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');

    if (avatarUpload && avatarPreview) {
        // Event listener for when a file is selected
        avatarUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];

            if (file) {
                // Check if the selected file is an image
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();

                    // When the file is loaded (read)
                    reader.onload = function(e) {
                        // Set the src of the avatar preview to the loaded image data
                        avatarPreview.src = e.target.result;
                    }

                    // Read the image file as a Data URL (base64 string)
                    reader.readAsDataURL(file);
                } else {
                    alert("Please select a valid image file.");
                    avatarUpload.value = null; // Clear the input if it's not an image
                }
            }
        });
    }

    // Optional: Basic form submission handling
    const form = document.getElementById('profile-settings-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form behavior
            
            const username = document.getElementById('username').value;
            
            // In a real application, you would use FormData to send data to a backend server.
            console.log("Attempting to save username:", username);
            
            alert("Settings saved successfully! (Check console for data)");
        });
    }
});
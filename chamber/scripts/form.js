// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
  
    // 1. Set the current timestamp in the hidden input field
    var currentTimestamp = new Date().toISOString(); // Get current date and time in ISO 8601 format
    var timestampElement = document.getElementById('timestamp'); // Select the hidden input element
    if (timestampElement) { // Ensure the element exists before setting its value
        timestampElement.value = currentTimestamp;
    } else {
        console.error("Timestamp input element not found.");
    }

    // 2. Open Modal when clicking on 'Learn More' links
    document.querySelectorAll('.open-modal').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior (i.e., page reload)
            const modalId = this.getAttribute('data-modal'); // Get the ID of the modal to open
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block'; // Show the modal
            }
        });
    });

    // 3. Close Modal when clicking on 'X' (close button)
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal'); // Get the ID of the modal to close
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none'; // Hide the modal
            }
        });
    });

    // 4. Close Modal if clicked outside of modal content
    window.addEventListener('click', function(event) {
        // Check if the user clicked outside of the modal content (i.e., on the overlay)
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none'; // Close the modal
        }
    });

    // 5. Extract URL parameters and display them in the thank you page
    const currentUrl = window.location.href;
    const everything = currentUrl.split("?"); // Split the URL at the "?" to isolate the query string

    if (everything.length > 1) {
        let formData = everything[1].split("&"); // Split query string into individual parameters

        // Function to extract the value of a specific query parameter (like 'first', 'last', etc.)
        function show(cup) {
            let result = "";
            formData.forEach((element) => {
                if (element.startsWith(cup)) {
                    result = element.split("=")[1].replace("%40", "@"); // Replace encoded '@' if exists
                }
            });
            return result;
        }

        // Display the extracted form data (from the query string) on the thank you page
        const showInfo = document.querySelector('#results');
        if (showInfo) {
            showInfo.innerHTML = `
                <p>Name: ${show("first")} ${show("last")}</p>
                <p>Your Email: ${show("email")}</p>
                <p>Your Phone: ${show("phone")}</p>
                <p>Business Name: ${show("business")}</p>
                <p>Timestamp: ${show("timestamp")}</p>
            `;
        }
    }
});

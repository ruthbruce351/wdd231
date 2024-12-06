document.addEventListener('DOMContentLoaded', function() {
  
    var currentTimestamp = new Date().toISOString();
    var timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.value = currentTimestamp;
    } else {
        console.error("Timestamp input element not found.");
    }

    document.querySelectorAll('.open-modal').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal'); 
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none'; 
            }
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none'; 
        }
    });

    const currentUrl = window.location.href;
    const everything = currentUrl.split("?");

    if (everything.length > 1) {
        let formData = everything[1].split("&");

        function show(cup) {
            let result = "";
            formData.forEach((element) => {
                if (element.startsWith(cup)) {
                    result = element.split("=")[1].replace("%40", "@");
                    if (cup === "business") {
                        result = result.replace(/\+/g, " "); 
                    }
                    if (cup === "timestamp") {
                        const decodedTimestamp = decodeURIComponent(result); 
                        const date = new Date(decodedTimestamp);
                        if (!isNaN(date.getTime())) { 
                            result = date.toLocaleString(); 
                        } else {
                            result = "Invalid Date"; 
                        }
                    }
                }
            });
            return result;
        }

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

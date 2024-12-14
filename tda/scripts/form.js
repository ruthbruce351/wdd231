document.addEventListener('DOMContentLoaded', function() {
    
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
            let result = "Invalid"; 
            formData.forEach((element) => {
                if (element.startsWith(cup)) {
                    result = decodeURIComponent(element.split("=")[1]); 
                    if (cup === "business") {
                        result = result.replace(/\+/g, " "); 
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
            `;
        }
    }
});

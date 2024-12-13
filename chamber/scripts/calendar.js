const calendarElement = document.getElementById("calendar");

currentDate = new Date();

function renderCalendar() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Get number of days in the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Create calendar header with month and year
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
        <button onclick="changeMonth(-1)">&#10094;</button>
        <span>${monthNames[currentMonth]} ${currentYear}</span>
        <button onclick="changeMonth(1)">&#10095;</button>
    `;

    // Create the table structure
    const table = document.createElement("table");

    // Create the table header (weekdays)
    const headerRow = document.createElement("tr");
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create the days of the month
    let day = 1;
    for (let row = 0; row < 6; row++) { // Maximum of 6 rows for the calendar (weeks)
        const tr = document.createElement("tr");
        for (let col = 0; col < 7; col++) {
            const td = document.createElement("td");
            if (row === 0 && col >= firstDay) {
                td.textContent = day++;
            } else if (row > 0 && day <= lastDay) {
                td.textContent = day++;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
        if (day > lastDay) break; // Stop creating rows once all days are added
    }

    // Clear any previous content in the calendar and append new content
    calendarElement.innerHTML = '';
    calendarElement.appendChild(header);
    calendarElement.appendChild(table);
}

// Change month when clicking the navigation buttons
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

// Initial rendering of the calendar
renderCalendar();

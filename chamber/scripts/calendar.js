const calendarElement = document.getElementById("calendar");

currentDate = new Date();

function renderCalendar() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
        <button onclick="changeMonth(-1)">&#10094;</button>
        <span>${monthNames[currentMonth]} ${currentYear}</span>
        <button onclick="changeMonth(1)">&#10095;</button>
    `;

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let day = 1;
    for (let row = 0; row < 6; row++) { 
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
        if (day > lastDay) break; 
    }

    calendarElement.innerHTML = '';
    calendarElement.appendChild(header);
    calendarElement.appendChild(table);
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

renderCalendar();

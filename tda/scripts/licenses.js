const gridViewButton = document.getElementById('gridViewButton');
const listViewButton = document.getElementById('listViewButton');
const memberContainer = document.getElementById('memberContainer');

async function fetchMembers() {
    try {
        const response = await fetch('data/licenses.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    memberContainer.innerHTML = '';

    if (memberContainer.classList.contains('list-view')) {
        const headerRow = document.createElement('div');
        headerRow.classList.add('header-row');
        headerRow.innerHTML = `
            <div class="header-cell">Name</div>
            <div class="header-cell">Phone</div>
            <div class="header-cell">License Number</div>
            <div class="header-cell">Categories</div>
            <div class="header-cell">Hire Date</div>
            <div class="header-cell">Expiration Date</div>
        `;
        memberContainer.appendChild(headerRow);
    }

    members.forEach(member => {
        const memberElement = document.createElement('div');

        if (memberContainer.classList.contains('grid-view')) {
            memberElement.classList.add('member-card');
            memberElement.innerHTML = `
                <div class="cell">${member.name}</div>
                <br>
                <div class="cell"><strong>Phone:</strong> ${member.phone}</div>
                <div class="cell"><strong>License #:</strong> ${member.licenseNumber}</div>
                <div class="cell"><strong>Categories:</strong> ${member.categories}</div>
                <div class="cell"><strong>Hire Date:</strong> ${member.hireDate}</div>
                <div class="cell"><strong>Exp. Date:</strong> ${member.expDate}</div>
            `;
        } else {
            memberElement.classList.add('member-item');
            memberElement.innerHTML = `
               <div class="cell">${member.name}</div>
                <div class="cell">${member.phone}</div>
                <div class="cell">${member.licenseNumber}</div>
                <div class="cell">${member.categories}</div>
                <div class="cell">${member.hireDate}</div>
                <div class="cell">${member.expDate}</div>
            `;
        }

        memberContainer.appendChild(memberElement);
    });
}

gridViewButton.addEventListener('click', () => {
    memberContainer.classList.add('grid-view');
    memberContainer.classList.remove('list-view');
    fetchMembers();
});

listViewButton.addEventListener('click', () => {
    memberContainer.classList.add('list-view');
    memberContainer.classList.remove('grid-view');
    fetchMembers(); 
});

fetchMembers();

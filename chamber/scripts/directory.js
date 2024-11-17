const gridViewButton = document.getElementById('gridViewButton');
const listViewButton = document.getElementById('listViewButton');
const memberContainer = document.getElementById('memberContainer');

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    memberContainer.innerHTML = '';

    members.forEach(member => {
        const memberElement = document.createElement('div');

        if (memberContainer.classList.contains('grid-view')) {
            memberElement.classList.add('member-card');
            memberElement.innerHTML = `
                <img loading="lazy" src="${member.image}" alt="${member.name} Image" />
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            `;
        } else {
            memberElement.classList.add('member-item');
            memberElement.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
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

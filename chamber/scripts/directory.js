// Get references to elements in the DOM
const memberContainer = document.getElementById("memberContainer");
const toggleButton = document.getElementById("toggleView");

// Variable to track current view
let isGridView = true;

// Fetch member data from the JSON file
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Function to display members in either grid or list view
function displayMembers(members) {
    memberContainer.innerHTML = ''; // Clear any existing content

    members.forEach(member => {
        // Create a card for each member
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        
        // Add membership level class for styling
        memberCard.classList.add(`level-${member.membershipLevel}`);

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p><strong>Other Info:</strong> ${member.otherInfo}</p>
        `;

        memberContainer.appendChild(memberCard);
    });

    // Apply the appropriate layout class for grid or list view
    if (isGridView) {
        memberContainer.classList.add('grid-view');
        memberContainer.classList.remove('list-view');
    } else {
        memberContainer.classList.add('list-view');
        memberContainer.classList.remove('grid-view');
    }
}

// Function to toggle between grid and list view
toggleButton.addEventListener('click', () => {
    isGridView = !isGridView; // Toggle the view
    fetchMembers(); // Re-fetch and display members
});

// Fetch members initially when the page loads
fetchMembers();

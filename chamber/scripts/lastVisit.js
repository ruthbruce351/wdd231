const messageElement = document.querySelector('#visit-message');

// Check if 'lastVisit' is stored in localStorage
let lastVisit = localStorage.getItem('lastVisit');

let currentDate = new Date();
const currentTime = currentDate.getTime();

// If there is a previous visit date stored
if (lastVisit) {
  const timeDifference = currentTime - lastVisit;
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert ms to days

  let message = '';
  if (daysDifference < 1) {
    message = "Back so soon! Awesome!";
  } else {
    message = `You last visited ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago.`;
  }
  
  messageElement.textContent = message;
} else {
  messageElement.textContent = "Welcome! Let us know if you have any questions.";
}

// Store the current date as the last visit date
localStorage.setItem('lastVisit', currentTime);

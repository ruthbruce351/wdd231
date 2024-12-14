const messageElement = document.querySelector('#visit-message');

let lastVisit = localStorage.getItem('lastVisit');

let currentDate = new Date();
const currentTime = currentDate.getTime();

if (lastVisit) {
  const timeDifference = currentTime - lastVisit;
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

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

localStorage.setItem('lastVisit', currentTime);

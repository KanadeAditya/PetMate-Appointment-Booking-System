// Create the navbar element
const navbar = document.createElement('nav');
navbar.id = 'navbar';

// Create the logo div
const logo = document.createElement('div');
logo.classList.add('logo');
navbar.appendChild(logo);

// Create the logo image
const logoImg = document.createElement('img');
logoImg.src = './Files/united-states-pets-small-business-logo-design-removebg-preview.png';
logoImg.alt = 'Admin Logo';
logo.appendChild(logoImg);

// Create the heading for the navbar
const heading = document.createElement('h1');
heading.textContent = 'Admin Console';
navbar.appendChild(heading);

// Create the navigation menu
const navMenu = document.createElement('ul');

// Create the Home link
const homeLink = document.createElement('li');
const homeLinkAnchor = document.createElement('a');
homeLinkAnchor.href = '#';
homeLinkAnchor.textContent = 'Home';
homeLink.appendChild(homeLinkAnchor);
navMenu.appendChild(homeLink);

// Create the APIs link
const apisLink = document.createElement('li');
const apisLinkAnchor = document.createElement('a');
apisLinkAnchor.href = '#';
apisLinkAnchor.textContent = 'APIs';
apisLink.appendChild(apisLinkAnchor);
navMenu.appendChild(apisLink);

// Create the Logout link
const logoutLink = document.createElement('li');
const logoutLinkAnchor = document.createElement('a');
logoutLinkAnchor.href = './index.html';
logoutLinkAnchor.textContent = 'Logout';
logoutLinkAnchor.addEventListener('click', () => {
  logout();
});
logoutLink.appendChild(logoutLinkAnchor);
navMenu.appendChild(logoutLink);

// Create the toggle button for dark mode
const toggleButton = document.createElement('li');
toggleButton.classList.add('toggle');
const toggleCheckbox = document.createElement('input');
toggleCheckbox.type = 'checkbox';
toggleCheckbox.classList.add('checkbox');
toggleCheckbox.id = 'chk';
const toggleLabel = document.createElement('label');
toggleLabel.classList.add('label');
toggleLabel.htmlFor = 'chk';
const toggleIconMoon = document.createElement('i');
toggleIconMoon.classList.add('fas', 'fa-moon');
const toggleIconSun = document.createElement('i');
toggleIconSun.classList.add('fas', 'fa-sun');
const toggleBall = document.createElement('div');
toggleBall.classList.add('ball');
toggleLabel.appendChild(toggleIconMoon);
toggleLabel.appendChild(toggleIconSun);
toggleLabel.appendChild(toggleBall);
toggleButton.appendChild(toggleCheckbox);
toggleButton.appendChild(toggleLabel);
navMenu.appendChild(toggleButton);

navbar.appendChild(navMenu);

// Append the navbar to the document body
document.body.appendChild(navbar);


// logout function here
function logout() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
  
    fetch(`${baseUrl}admin/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    })
    .then(res => res.json())
    .then((res) => {
  
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
  
      window.location.href = './index.html';
    })
    .catch((error) => {
      console.log(error);
    });
  }

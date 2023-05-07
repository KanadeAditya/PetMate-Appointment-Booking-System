// Create the sidebar element
const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');

// Create the heading for the sidebar
const heading = document.createElement('h2');
heading.textContent = 'Admin Details';
sidebar.appendChild(heading);

// Create the admin avatar image
const avatar = document.createElement('img');
avatar.src = './Files/admin.png';
avatar.alt = 'Admin Avatar';
sidebar.appendChild(avatar);

// Create the admin name
const name = document.createElement('h3');
name.textContent = 'Name: John Doe';
sidebar.appendChild(name);

// Create the admin email
const email = document.createElement('p');
email.textContent = 'Email: johndoe@example.com';
sidebar.appendChild(email);

// Create the logout button
const logoutButton = document.createElement('button');
logoutButton.textContent = 'Logout';
logoutButton.addEventListener('click', () => {
  // Handle logout logic here
});
sidebar.appendChild(logoutButton);

// Append the sidebar to the document body
document.body.appendChild(sidebar);

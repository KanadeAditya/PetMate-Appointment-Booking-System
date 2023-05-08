// Create the sidebar element
const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');

// Create the heading for the sidebar
const heading = document.createElement('h2');
heading.textContent = 'Admin Details';
sidebar.appendChild(heading);

// Fetch admin data from backend
fetch('/api/admin')
  .then(response => response.json())
  .then(data => {
    // Create the admin avatar image
    const avatar = document.createElement('img');
    avatar.src = data.avatar;
    avatar.alt = 'Admin Avatar';
    sidebar.appendChild(avatar);

    // Create the admin name
    const name = document.createElement('h3');
    name.textContent = `Name: ${data.name}`;
    sidebar.appendChild(name);

    // Create the admin email
    const email = document.createElement('p');
    email.textContent = `Email: ${data.email}`;
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
  })
  .catch(error => {
    console.error('Error fetching admin data:', error);
  });


const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');


const heading = document.createElement('h2');
heading.textContent = 'Admin Details';
sidebar.appendChild(heading);


fetch('/api/admin')
  .then(response => response.json())
  .then(data => {
    const avatar = document.createElement('img');
    avatar.src = data.avatar;
    avatar.alt = 'Admin Avatar';
    sidebar.appendChild(avatar);

    const name = document.createElement('h3');
    name.textContent = `Name: ${data.name}`;
    sidebar.appendChild(name);

    const email = document.createElement('p');
    email.textContent = `Email: ${data.email}`;
    sidebar.appendChild(email);

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', () => {
      // Handle logout logic here
    });
    sidebar.appendChild(logoutButton);
    document.body.appendChild(sidebar);
  })
  .catch(error => {
    console.error('Error fetching admin data:', error);
  });
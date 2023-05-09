import { baseUrl } from "./baseUrl.js";


const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');

const heading = document.createElement('h2');
heading.textContent = 'Admin Details';
sidebar.appendChild(heading);

const adminData = JSON.parse(localStorage.getItem('petmate'));

// const token = localStorage.getItem('token')

// if (token) {
//   const { email } = jwt_decode(token); // Decode the token and extract the email
//   const emailElement = document.createElement('p');
//   emailElement.textContent = `Email: ${email}`;
//   sidebar.appendChild(emailElement);
// }

if (adminData) {
  const avatar = document.createElement('img');
  avatar.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAZlBMVEUAAAD////e3t78/PzR0dH29vbm5ubV1dXx8fHs7Ow1NTV7e3v5+fmAgICMjIyFhYXKyspUVFRkZGSwsLClpaWbm5sqKipycnIjIyNsbGySkpJeXl68vLwTExM8PDzExMQaGhpJSUn1fjf9AAAEN0lEQVRoge2b6ZaiMBCFI8iioIAobqD4/i857bEXhEpyU0noOWfm/m796JDUdqNYsBQG7SF7NJ3omtvxUi9z3tcsFoLxmfS+a8S7Ttc6nokfb9eC0ukYzMCPNiT8paP5GhjyawX9qW3okx8/NHghmsQf/95r8R/a++Lr1v5LhR/+AcQLcfbB38J4owdA+XsDvBAb1/zSCG+wCTH+qjfkC/QYQvywMsULETnkm738lzJ3fPPVf2rpjK9KOXJdXfFzFl6I0hHfJPIMVbnhRycmXyD1iJ5/5+LFwQk/Y/M7F/z0xuaL1AE/4ONF64DfWvCBSkTL556+p4A6QMu/WvDX+rZIy7fYfkgS1PFDK77+AOj4Od1sgdL3Qzp+9I/z7dZ/Zc3/7f2/YJSe32oc8AsL/k6L1/PRrpMS0AZp+YkFv3bAX1kcAGAco69/zny+Hg/w+QXA1gk/ZfORDghYI24BegPwCD9m8oHqD+v/diz8AxoFInxeCXxH8Fj/z6lBgdgL8zlFgD714nzGG4A2H8w3zkLwAA6d/5ml4Ss8BofnnyZp4AEOv0z4iyOMv+F4k/n3BcRDcxcGHxwDbowsECP/oxzbXoTQg8fhL1LdKLAydaBM/a9AVY/fsJhvw/94CbKTWLUMF5TjfwaHWzdid+ttYmq9sfnPR2i31fczPLKaB0f4YVLvL5vNntpYURzE9IghOWTFZd/qJ6Bqflz//JcZvrWT76FRv2vViVjFT8798B2fgHbmqfy9XGkK1SrI+fF0n++QJVhOO/ZCnhCkfDrYakfKORmhOmlgkPBzWZhZq40tabMkK0hofqoo+Dbyl5AoKnVJPUry1TPvLkuoQJff1X3CkQwRFF9v990O40VIttrcSLajFB+rdIq6jKM8zKOg3GOfoExZgo/Xut3pqXEukP85sXen/BWMNxbREU/5fL9Hr+kbmPBt5k16TQ7OhG8x7gF00fGXXvHiNM6GYz5v1oBrvAAjvo3bBumWKvloj8PXXckHGgxLXVV8vtcMq1sp+DZmI6pawWdb/QY6yvkeQ/9Acr6N14ArkPJtvBZctYzPuebEUCHj8yftRqpyCd9v6v1RKuHPs/3eN+CQP8/2e08BQ77v3PulC82P9Ld73ehI822cPiNdaX7cz8QfjocH/LmOn1ivSL7n0vNHfUzyZyg+PhWQ/LnCz9vl3AGfc8uVpyXJxy+Y++H7r73/818q/0r+b++/3z5/pr8x4IuOf7Pln4bOP7H/5velKiT5oc1VUxMNZ9HD+m+O7vcpWf3pffjyqUjC/+3+y+quNa5Yyl/MUQEr5g+zhCDV/GeGFmxk4o34oe8ebGyCjOevK79nIBubQJP5d+rzAaY/yiL8F38GBOFeUv7T3c8xrCgfmPT/ooP7J3i0sP/3obS99g7hp3MpuaAg97/Tst5cG8un6Pr1uVD9PP4PzTk3zYLel6QAAAAASUVORK5CYII=";
  avatar.alt = 'Admin Avatar';
  sidebar.appendChild(avatar);

  const name = document.createElement('h3');
  name.textContent = `Name: ${adminData.name}`;
  sidebar.appendChild(name);

  const role= document.createElement('p');
  role.textContent = `Role: ${adminData.role}`;
  sidebar.appendChild(role)

  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.addEventListener('click', () => {
    logout()
    console.log("Botton clicked");
  });
  sidebar.appendChild(logoutButton);
  document.body.appendChild(sidebar);
} else {
  console.error('Admin data not found in local storage');
}


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

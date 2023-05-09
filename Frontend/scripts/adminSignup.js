import {baseUrl} from "./baseUrl.js";


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usersDetail = {
        name: document.querySelector(".name").value,
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value
    }
    console.log(usersDetail)

    fetch(baseUrl+`admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersDetail)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.msg ==="login successful") {
                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                    willClose: () => {
                        window.open("adminLogin.html")
                      }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.msg
                })
            }
        })
})
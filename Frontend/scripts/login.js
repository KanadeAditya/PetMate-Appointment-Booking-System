
import baseUrl from "./baseUrl.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("heelo")
    const usersDetail = {
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value
    }

    console.log(usersDetail)

    fetch(`${baseUrl}customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersDetail)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.msg=="login successfully") {
                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                    showConfirmButton: false,
                    timer: 1000,
                    willClose: () => {
                        window.open("home.html")
                      }
                })

                localStorage.setItem("token",res.acessToken)
                localStorage.setItem("userName",res.name)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.msg
                })
            }
        })
})


 
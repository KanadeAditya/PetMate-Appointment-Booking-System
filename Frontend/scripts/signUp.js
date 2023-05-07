import baseUrl from "./baseUrl.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usersDetail = {
        name: document.querySelector(".name").value,
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value
    }

    // console.log(usersDetail)

    // fetch(baseUrl+"customers/emailVerify",{
    //     method:"POST",
    //     headers:{'Content-Type': 'application/json'},
    //     body:JSON.stringify(usersDetail)
    // })
    // .then((res)=>res.json())
    // .then((res)=>{
        
    // })

    fetch(baseUrl+`customers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersDetail)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.msg === "Customer Registered successfully") {
                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                    // showConfirmButton: false,
                    // timer: 1000,
                    // theme:"light" ,
                    willClose: () => {
                        window.open("login.html")
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
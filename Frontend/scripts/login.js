
import {baseUrl} from "./baseUrl.js";

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
            if (res.msg=="login successful") {
                

                localStorage.setItem("token",res.acessToken)
                localStorage.setItem("refreshToken",res.refToken)
                localStorage.setItem("userName",res.name)
                console.log(res)
                localStorage.setItem("petmate",JSON.stringify({userId:res.userID,role:res.role,name:res.name,status:true }))

                
                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                    showConfirmButton: false,
                    timer: 1000,
                    willClose: () => {
                        window.open("home.html")
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

let doc=document.getElementById("OauthCustomer")
doc.addEventListener("click",(e)=>{
    window.location.href=`https://salmon-coral-gear.cyclic.app/doctor/check?type=login&from=customer`
     
})

 